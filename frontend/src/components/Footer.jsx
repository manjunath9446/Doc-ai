// src/components/Footer.jsx
import React from 'react';
import { Diamond, Linkedin, Facebook, Mail } from 'lucide-react';
import './components.css'; // Import the shared stylesheet

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Info and Socials */}
          <div className="footer-info">
            <a href="/" className="footer-logo">
              <Diamond />
              <span>docparser</span>
            </a>
            <p className="footer-description">
              Productive teams use Docparser – extract data from PDF, Word, Image, & more Documents.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="LinkedIn"><Linkedin /></a>
              <a href="#" aria-label="Email"><Mail /></a>
              <a href="#" aria-label="Facebook"><Facebook /></a>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div className="footer-links">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">DocparserAI</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Academy</a></li>
              <li><a href="#">Parsing Assistant</a></li>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Development API</a></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Schedule a Demo</a></li>
              <li><a href="#">Partner Program</a></li>
              <li><a href="#">Affiliate Program</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Blog/Resources */}
          <div className="footer-links">
            <h4>Blog</h4>
            <ul>
              <li><a href="#">Extract Data From PDF</a></li>
              <li><a href="#">Convert PDF to JSON</a></li>
              <li><a href="#">Convert PDF to XML</a></li>
              <li><a href="#">Extract Text From PDF</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-separator"></div>
        <div className="footer-bottom-bar">
          <p className="copyright-text">© 2025 DocAI, Inc. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Legal Notice</a>
            <a href="#">Security Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;