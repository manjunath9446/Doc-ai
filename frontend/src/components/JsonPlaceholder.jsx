// src/components/JsonPlaceholder.jsx
import React from 'react';
// Correctly import the chosen SVG from the 'json-placeholder' folder
import placeholderImage from '../assets/json-placeholder/undraw_data-analysis_b7cp.svg';

const JsonPlaceholder = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full text-gray-500">
      <img 
        src={placeholderImage} 
        alt="Data analysis illustration" 
        className="w-40 h-40 mb-6" // Added margin-bottom
      />
      <h3 className="font-semibold text-lg text-gray-700">JSON output will appear here</h3>
      <p className="text-sm mt-1 max-w-xs">
        Once a document is processed, the structured data will be displayed in JSON format.
      </p>
    </div>
  );
};

export default JsonPlaceholder;