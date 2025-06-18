// src/components/FeatureCard.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, buttonText, onClick }) => {
  return (
    <div className="feature-card">
      <header className="feature-card-header">
        <div className="feature-card-icon-wrapper">
          <Icon className="feature-card-icon" />
        </div>
        <div>
          <h3 className="feature-card-title">{title}</h3>
          <p className="feature-card-description">{description}</p>
        </div>
      </header>
      <div className="feature-card-content">
        {/* Future content can go here */}
      </div>
      <footer className="feature-card-footer">
        <button onClick={onClick} className="feature-card-button">
          {buttonText}
          <ArrowRight className="button-icon" />
        </button>
      </footer>
    </div>
  );
};

export default FeatureCard;