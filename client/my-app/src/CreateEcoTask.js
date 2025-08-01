import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEcoTask.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon issue for leaflet in React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const bannerUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80";
const BG_VIDEO_URL = process.env.PUBLIC_URL + '/bg-green.mp4';

function LocationPicker({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function CreateEcoTask() {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);
  const [locError, setLocError] = useState('');
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocError('');
      },
      () => setLocError("Unable to retrieve your location.")
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/submitted-successfully');
    }, 800);
  };

  return (
    <div className="create-eco-task-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <video
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.35,
          background: '#eafaf1',
          filter: 'blur(1px) brightness(0.95)'
        }}
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form className="create-eco-task-form" onSubmit={handleSubmit}>
        <img
          src={bannerUrl}
          alt="Neighborhood Cleanup"
          className="create-eco-task-banner"
        />
        <h2>Neighborhood Cleanup Mission</h2>
        <p>
          Join your neighbors to clean up your local area! Collect litter, sort recyclables, and help make your neighborhood greener and cleaner.
        </p>
        <div>
          <label htmlFor="proof">Upload Proof (Photo/Video)</label>
          <input
            id="proof"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {file && (
            <div className="eco-task-file-name">
              📎 {file.name}
            </div>
          )}
        </div>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button
              type="button"
              className="eco-task-location-btn"
              style={{ flex: 1 }}
              onClick={handleGetLocation}
            >
              Use My Location
            </button>
            <button
              type="button"
              className="eco-task-location-btn"
              style={{ flex: 1 }}
              onClick={() => setShowMap((v) => !v)}
            >
              {showMap ? "Hide Map" : "Pin on Map"}
            </button>
          </div>
          {showMap && (
            <div style={{ height: 220, marginBottom: 8, borderRadius: 12, overflow: 'hidden' }}>
              <MapContainer
                center={location ? [location.lat, location.lng] : [20.5937, 78.9629]} // Center on India by default
                zoom={5}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker setLocation={setLocation} />
                {location && <Marker position={[location.lat, location.lng]} />}
              </MapContainer>
            </div>
          )}
          {location && (
            <div className="eco-task-location">
              <span>Latitude:</span> {location.lat}
              <br />
              <span>Longitude:</span> {location.lng}
            </div>
          )}
          {locError && (
            <div className="eco-task-error">{locError}</div>
          )}
        </div>
        <button
          type="submit"
          className="eco-task-submit-btn"
          disabled={!file || !location}
        >
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default CreateEcoTask;