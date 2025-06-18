// src/components/Sidebar.jsx
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Diamond, LayoutDashboard, FileText, FileCode2, Bot, Settings, LifeBuoy } from 'lucide-react';
import './components.css'; // Make sure styles are imported

const Sidebar = () => {
  const { user } = useUser();

  const navItems = [
    { name: 'Doc Parser', icon: FileText, href: '/app/doc-parser', active: true },
    { name: 'Resume Parser', icon: FileCode2, href: '#', active: false },
    { name: 'Chat History', icon: Bot, href: '#', active: false },
    { name: 'Settings', icon: Settings, href: '#', active: false },
    { name: 'Support', icon: LifeBuoy, href: '#', active: false },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Diamond className="logo-icon" />
        <h1>Doc Parser</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            // Use an 'active' class for styling the current page link
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Spacer to push the footer down */}
      <div style={{ flexGrow: 1 }}></div> 
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div>
            <p className="user-name">{user?.fullName}</p>
            <p className="user-email">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;