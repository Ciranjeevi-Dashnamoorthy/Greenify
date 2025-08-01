import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const events = [
  {
    id: '1',
    title: 'Community Clean-Up Drive',
    time: '10:00 AM',
    description: 'Join us for a community clean-up drive at the city park. Help us make our environment cleaner and greener. All supplies provided!',
  },
  {
    id: '2',
    title: 'Tree Plantation Event',
    time: '2:30 PM',
    description: 'Participate in our tree plantation event. Let’s plant saplings together and contribute to a greener future. Tools and saplings will be provided.',
  },
  // Add more events as needed
];

const previousCampaigns = [
  {
    title: "Beach Clean-Up 2024",
    date: "April 12, 2024",
    summary: "Over 150 volunteers joined to remove 2 tons of waste from the city beach. The campaign raised awareness about marine pollution and recycling."
  },
  {
    title: "Urban Tree Drive",
    date: "February 28, 2024",
    summary: "Planted 500+ saplings in urban neighborhoods. Local schools and residents participated, making the city greener and cleaner."
  },
  {
    title: "Plastic-Free Week",
    date: "January 15-21, 2024",
    summary: "Encouraged citizens to avoid single-use plastics for a week. Shops and cafes offered discounts for reusable containers."
  }
];

function EcoEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Event not found.</div>;
  }

  if (joined) {
    return (
      <div className="event-success">
        <h2>🎉 Successfully Joined!</h2>
        <p>Thank you for joining <strong>{event.title}</strong>.<br />We look forward to seeing you there!</p>
        <button className="create-task-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="eco-event-page">
      <h2>{event.title}</h2>
      <p><strong>Time:</strong> {event.time}</p>
      <p className="event-desc">{event.description}</p>
      <button className="create-task-btn" onClick={() => setJoined(true)}>Join Event</button>

      {/* Previous Campaigns Box */}
      <div className="previous-campaigns-box">
        <h3>Previous Campaigns</h3>
        <ul>
          {previousCampaigns.map((c, idx) => (
            <li key={idx} className="campaign-item">
              <strong>{c.title}</strong> <span className="campaign-date">({c.date})</span>
              <div className="campaign-summary">{c.summary}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EcoEventPage;