import React, { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import './components.css';

// const API_URL = 'http://localhost:8000';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const DocumentUploader = ({ setIsLoading, setError, onParseSuccess, getToken }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [language, setLanguage] = useState('eng');
  const [componentLoading, setComponentLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleParse = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setComponentLoading(true);
    setError('');
    onParseSuccess(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('language', language);

    try {
      const token = await getToken();
      const response = await axios.post(`${API_URL}/parse-document/`, formData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      onParseSuccess(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message;
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setComponentLoading(false);
    }
  };

  return (
    <div className="uploader-box">
      <div className="uploader-dropzone">
        <h3>Drag and drop or browse</h3>
        <p>Supported formats: PDF, PNG, JPG</p>
        <label htmlFor="file-upload" className="browse-button-label">
          {selectedFile ? 'Change File' : 'Browse Files'}
        </label>
        <input 
          type="file" 
          id="file-upload" 
          className="hidden-file-input" 
          onChange={handleFileChange} 
          accept=".pdf,.png,.jpg,.jpeg" 
        />
        {selectedFile && <p className="selected-file-text">Selected: {selectedFile.name}</p>}
      </div>

      {selectedFile && (
        <div className="uploader-actions">
          <div className="language-select-wrapper">
            <label htmlFor="language-select">Document Language</label>
            <select 
              id="language-select" 
              className="language-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="eng">English</option>
              <option value="hin">Hindi</option>
              <option value="kan">Kannada</option>
              <option value="deu">German</option>
              <option value="fra">French</option>
              <option value="spa">Spanish</option>
            </select>
          </div>
          <button onClick={handleParse} className="feature-card-button" disabled={componentLoading}>
            {componentLoading && <Loader2 className="button-icon animate-spin" />}
            Parse Document
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;