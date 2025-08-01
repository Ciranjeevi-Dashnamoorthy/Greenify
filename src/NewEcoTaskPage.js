import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const tags = ["Recycling", "Planting", "Clean-Up", "Transport", "Energy", "Water"];

function LocationPicker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function NewEcoTaskPage() {
  const [title, setTitle] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [location, setLocation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [proof, setProof] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapCoords, setMapCoords] = useState({ lat: 20, lng: 0 }); // Default center

  const navigate = useNavigate();

  const handleProofChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleMapSelect = async (coords) => {
    setMapCoords(coords);
    setLocation(`${coords.lat},${coords.lng}`);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
      );
      const data = await res.json();
      setLocationName(data.display_name || `${coords.lat},${coords.lng}`);
    } catch {
      setLocationName(`${coords.lat},${coords.lng}`);
    }
    setShowMap(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="new-eco-task-page">
      <h2>New Eco Task</h2>
      <form className="new-eco-task-form" onSubmit={handleSubmit}>
        <label>
          Task Title
          <input
            type="text"
            placeholder="Eco Task Title Here"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Select Tag
          <div className="tags">
            {tags.map(tag => (
              <span
                key={tag}
                className={selectedTag === tag ? "tag selected" : "tag"}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </label>
        <label>
          Location
          <div style={{ marginTop: '6px' }}>
            <button
              type="button"
              className="create-task-btn"
              style={{ width: 'auto', padding: '6px 16px', fontSize: '0.95rem', background: '#b2dfdb', color: '#2e7d32' }}
              onClick={() => setShowMap(true)}
            >
              Pick on Map
            </button>
            {locationName && (
              <span style={{ color: '#388e3c', fontWeight: 500, marginLeft: '12px' }}>{locationName}</span>
            )}
          </div>
          {showMap && (
            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <p>Click on the map to select a location (zoom and pan supported):</p>
              <MapContainer
                center={[mapCoords.lat, mapCoords.lng]}
                zoom={2}
                style={{ height: '300px', width: '100%', borderRadius: '12px', border: '1px solid #b2dfdb', marginBottom: '10px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationPicker setCoords={coords => handleMapSelect(coords)} />
                {mapCoords.lat && mapCoords.lng && (
                  <Marker position={[mapCoords.lat, mapCoords.lng]} />
                )}
              </MapContainer>
              <button
                type="button"
                className="create-task-btn"
                style={{ marginTop: '10px', width: 'auto', padding: '6px 16px', fontSize: '0.95rem' }}
                onClick={() => setShowMap(false)}
              >
                Close Map
              </button>
            </div>
          )}
        </label>
        <label>
          Upload Proof (Photo or Document)
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleProofChange}
            required
          />
          {proof && <div className="file-name">{proof.name}</div>}
        </label>
        <button className="create-task-btn" type="submit">Submit Task</button>
      </form>
      {success && (
        <div className="eco-task-success">
          <h2>✅ Eco Task Submitted!</h2>
          <p>Your new eco task has been submitted for review.<br />Thank you for making a difference!</p>
          <button className="create-task-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
}

export default NewEcoTaskPage;