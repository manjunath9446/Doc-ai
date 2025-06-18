// src/pages/DocParserPage.jsx
import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import Sidebar from '@/components/Sidebar';
import DocumentUploader from '@/components/DocumentUploader';
import JsonViewer from '@/components/JsonViewer';
import Chatbot from '@/components/Chatbot';
import '@/components/components.css';
import { Loader2 } from 'lucide-react';

const DocParserPage = () => {
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('json');
  const { getToken } = useAuth();

  const handleParseSuccess = (data) => {
    setDocumentData(data);
    setError('');
    setActiveTab('chat');
  };

  const renderJsonContent = () => {
    if (isLoading) {
      return <div className="loader-container"><Loader2 className="loader-icon animate-spin" /></div>;
    }
    if (error) {
      return <div className="error-container">{error}</div>;
    }
    if (documentData) {
      return <JsonViewer data={documentData.structured_data} />;
    }
    return (
      <div className="placeholder-container">
        <p>Upload a document to see the JSON output.</p>
      </div>
    );
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Document Parser</h1>
          <p>Upload a document to extract its content and chat with it.</p>
        </header>
        <div className="parser-layout">
          <div className="uploader-column">
            <DocumentUploader
              setIsLoading={setIsLoading}
              setError={setError}
              onParseSuccess={handleParseSuccess}
              getToken={getToken}
            />
          </div>
          <div className="output-column">
            <div className="tabs-list">
              <button onClick={() => setActiveTab('json')} className={`tabs-trigger ${activeTab === 'json' ? 'active' : ''}`}>
                Structured Data
              </button>
              <button onClick={() => setActiveTab('chat')} className={`tabs-trigger ${activeTab === 'chat' ? 'active' : ''}`} disabled={!documentData}>
                Chat
              </button>
            </div>
            <div className="output-card">
              <div className="output-card-content">
                {activeTab === 'json' && renderJsonContent()}
                {activeTab === 'chat' && (
                  documentData ? (
                    <Chatbot documentContext={documentData.raw_text} getToken={getToken} />
                  ) : (
                    <div className="placeholder-container">
                      <p>Chat is disabled until a document is successfully processed.</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocParserPage;