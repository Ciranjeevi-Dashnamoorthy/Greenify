import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskDetails.css';
import { auth } from './firebase';
import { completeTask } from './utils/userService';


const BG_VIDEO_URL = process.env.PUBLIC_URL + '/bg-green.mp4';

const taskData = {
  "1": {
    title: 'Recycle 5 Plastic Bottles',
    description: 'Collect and recycle at least 5 plastic bottles today.',
    image: 'https://th.bing.com/th/id/R.e7436c74e7f062f85ea1ef51171c1c07?rik=XEic%2bEPmfWq9nw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f140000%2fvelka%2frecycled-plastic-bottles.jpg&ehk=BUF0vn5HTAZrp3trF2mC3GdXWpE52wtGWDTc%2fAA9RAA%3d&risl=&pid=ImgRaw&r=0',
    steps: [
      'Collect at least 5 empty plastic bottles from your home or surroundings.',
      'Rinse the bottles to remove any residue.',
      'Take them to your nearest recycling bin or center.',
      'Take a photo or video as proof of recycling.',
      'Upload your proof below and submit.'
    ],
    points: 50
  },
  "2": {
    title: 'Plant a Tree in Your Neighborhood',
    description: 'Plant a sapling in your local area and help it grow.',
    image: 'https://www.myplantmytaste.com/wp-content/uploads/2020/07/plant-tree.jpg',
    steps: [
      'Get a sapling from a nursery or use a seedling.',
      'Find a suitable spot in your neighborhood or park.',
      'Dig a small hole and plant the sapling.',
      'Water the plant and take a photo as proof.',
      'Upload your proof below and submit.'
    ],
    points: 100
  },
  "3": {
    title: 'Use Public Transport Today',
    description: 'Reduce your carbon footprint by using public transport.',
    image: 'https://webflow-amber-prod.gumlet.io/620e4101b2ce12a1a6bff0e8/64f70150b434f81e85e14e73_benefits%20of%20using%20public%20transportation.jpg',
    steps: [
      'Plan your route using public transport (bus, train, etc).',
      'Travel to your destination using public transport.',
      'Take a photo of your ticket or while on the transport.',
      'Upload your proof below and submit.'
    ],
    points: 25
  },
};

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const task = taskData[taskId];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const user = auth.currentUser;
      if (user && task && task.points) {
        await completeTask(user.uid, task);
      }
      navigate('/submitted-successfully', { state: { points: task.points } });
    }
  };

  if (!task) {
    return <div className="task-details-container">Task not found.</div>;
  }

  return (
    <div className="task-details-root">
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="task-details-container">
        <h2 className="task-title">{task.title}</h2>
        <img src={task.image} alt={task.title} className="task-image" />
        <p className="task-desc">{task.description}</p>
        <form onSubmit={handleSubmit}>
          <div className="upload-section">
            <label htmlFor="proof-upload">Upload Proof (Image/File):</label>
            <input
              type="file"
              id="proof-upload"
              onChange={handleFileChange}
            />
            {file && (
              <div className="file-name">
                📎 {file.name}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={!file}
          >
            Submit Proof
          </button>
        </form>
        <div className="task-steps">
          <h4>How to Complete This Task:</h4>
          <ol>
            {task.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;