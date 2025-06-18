// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Sidebar from '@/components/Sidebar';
import FeatureCard from '@/components/FeatureCard';
import { FileText, FileCode2 } from 'lucide-react';
import '@/components/components.css';

const DashboardPage = () => {
  // Initialize the navigate function from the router
  const navigate = useNavigate();

  // --- FIX: Define the handler functions ---
  const handleDocParserClick = () => {
    // This will navigate to the new page we are about to create
    navigate('/app/doc-parser');
  };

  const handleResumeParserClick = () => {
    // This can navigate to another page in the future
    alert("Resume Parser coming soon!");
    // navigate('/app/resume-parser');
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Getting Started with Docparser</h1>
          <p>Choose a parser to begin extracting data from your documents.</p>
        </header>

        <div className="feature-grid">
          {/* Document Parser Card */}
          <FeatureCard
            icon={FileText}
            title="Document Parser"
            description="A general-purpose parser for invoices, forms, and other standard documents."
            buttonText="Create Document Parser"
            onClick={handleDocParserClick} // This will now work
          />

          {/* Resume Parser Card */}
          <FeatureCard
            icon={FileCode2}
            title="Resume Parser"
            description="Extract structured data like contact info, skills, and experience from resumes."
            buttonText="Create Resume Parser"
            onClick={handleResumeParserClick} // This will also work
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;