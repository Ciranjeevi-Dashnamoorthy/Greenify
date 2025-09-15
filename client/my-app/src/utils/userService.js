import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, increment, arrayUnion } from "firebase/firestore";

/**
 * Save user data to Firestore if not already present.
 * @param {object} user - Firebase user object
 * @param {string} provider - 'google' or 'email'
 */
export async function saveUserToFirestore(user, provider = "google") {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      photoURL: user.photoURL || "",
      provider,
      ecoPoints: 0,
      completedTasks: 0,
      badges: [],
      recentTasks: [],
      rank: "Eco Hero",
      nextRank: "Eco Legend",
      progress: 0,
      createdAt: new Date()
    });
  }
}

/**
 * Add eco points to a user.
 * @param {string} uid - User ID
 * @param {number} points - Points to add
 */
export async function addEcoPoints(uid, points) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ecoPoints: increment(points)
  });
}

/**
 * Mark a task as completed for a user (add points, increment completedTasks, add to recentTasks)
 * @param {string} uid - User ID
 * @param {object} task - Task object with title, description, points
 */
export async function completeTask(uid, task) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  let newEcoPoints = task.points;
  let badges = [];
  if (userSnap.exists()) {
    const data = userSnap.data();
    newEcoPoints = (data.ecoPoints || 0) + task.points;
    badges = data.badges || [];
  }

  // Calculate badge level
  const badgeLevel = Math.floor(newEcoPoints / 1000);
  const badgeNames = [
    { name: "Eco Bronze", icon: "🥉" },
    { name: "Eco Silver", icon: "🥈" },
    { name: "Eco Gold", icon: "🥇" },
    { name: "Eco Platinum", icon: "🏆" },
    { name: "Eco Diamond", icon: "💎" }
  ];
  // Assign badge for each 1000 points
  let newBadges = [...badges];
  for (let i = 1; i <= badgeLevel; i++) {
    const badge = badgeNames[(i - 1) % badgeNames.length];
    if (!badges.some(b => b.name === badge.name && b.level === i)) {
      newBadges.push({ ...badge, level: i });
    }
  }

  await updateDoc(userRef, {
    ecoPoints: increment(task.points),
    completedTasks: increment(1),
    recentTasks: arrayUnion({
      title: task.title,
      desc: task.description,
      date: new Date().toLocaleDateString(),
      points: task.points
    }),
    badges: newBadges
  });
}