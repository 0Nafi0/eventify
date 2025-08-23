// src/components/EventCard.jsx

import React from 'react';

function EventCard() {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow border-0">
        <img src="event-image.jpg" className="card-img-top" alt="Event" />
        <div className="card-body">
          <h5 className="card-title">Event Title</h5>
          <p className="card-text">Date: January 1, 2025</p>
          <p className="card-text">Location: University Hall</p>
          <button className="btn btn-primary w-100">Register</button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
