// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import Header from '@/components/Header'; // We reuse the simple header
import '@/components/components.css'; // Make sure styles are imported

// src/pages/HomePage.jsx

// --- import your new SVG assets ---
// Note: We use the '@/assets/...' path alias for cleanliness.
// src/pages/HomePage.jsx

// --- Import your new SVG assets ---
// Note: We use the correct sub-folder paths inside /assets/
import smartParserIcon from '@/assets/chat-placeholder/Chat-bot-rafiki.svg';
import resumeParserIcon from '@/assets/json-placeholder/undraw_document-analysis_3c0y.svg';
import step1Image from '@/assets/json-placeholder/undraw_connection_ts3f.svg';
import step2Image from '@/assets/chat-placeholder/Messaging-amico.svg';
import step3Image from '@/assets/undraw_chat-bot_44el.svg'; // Assuming this one is directly in /assets
import Footer from '@/components/Footer'; // <-- 1. IMPORT THE FOOTER


const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-cards-container">
            {/* --- START OF FIX: CONDITIONAL LINKS --- */}

            {/* If the user is signed in, this card is a direct link to the dashboard */}
            <SignedIn>
              <Link to="/app" className="hero-card blue">
                <img src={smartParserIcon} alt="AI Icon" className="hero-card-icon" />
                <h2 className="hero-card-title">SmartAI Parser</h2>
                <p className="hero-card-description">
                  Utilize our sophisticated template for automatic rule creation, recognize handwriting, and summarize content.
                </p>
                <div className="hero-card-button">Explore SmartAI Parser</div>
              </Link>
            </SignedIn>

            {/* If the user is signed OUT, this card opens the sign-in modal */}
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/app">
                <div className="hero-card blue" style={{cursor: 'pointer'}}>
                  <img src={smartParserIcon} alt="AI Icon" className="hero-card-icon" />
                  <h2 className="hero-card-title">SmartAI Parser</h2>
                  <p className="hero-card-description">
                    Utilize our sophisticated template for automatic rule creation, recognize handwriting, and summarize content.
                  </p>
                  <div className="hero-card-button">Explore SmartAI Parser</div>
                </div>
              </SignInButton>
            </SignedOut>

            {/* Repeat the same pattern for the second card */}
            <SignedIn>
              <Link to="/app" className="hero-card purple">
                <img src={resumeParserIcon} alt="Resume Icon" className="hero-card-icon" />
                <h2 className="hero-card-title">ResumeAI Parser</h2>
                <p className="hero-card-description">
                  Efficiently parse various resume formats to expedite candidate evaluation.
                </p>
                <div className="hero-card-button">Explore ResumeAI Parser</div>
              </Link>
            </SignedIn>
            
            <SignedOut>
               <SignInButton mode="modal" redirectUrl="/app">
                <div className="hero-card purple" style={{cursor: 'pointer'}}>
                  <img src={resumeParserIcon} alt="Resume Icon" className="hero-card-icon" />
                  <h2 className="hero-card-title">ResumeAI Parser</h2>
                  <p className="hero-card-description">
                    Efficiently parse various resume formats to expedite candidate evaluation.
                  </p>
                  <div className="hero-card-button">Explore ResumeAI Parser</div>
                </div>
              </SignInButton>
            </SignedOut>

            {/* --- END OF FIX --- */}
          </div>
        </section>

        {/* ... your other sections like "Workflows" ... */}
        
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;