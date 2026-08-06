import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import { Moon, Sun, Settings as SettingsIcon, Shield, Bell } from 'lucide-react';
import './settings.css';

const Settings = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme to persist the setting
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('light-theme');
        localStorage.setItem('admin-theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('admin-theme', 'dark');
      }
      return newMode;
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar activePage="settings" />
      <main className="admin-main">
        <AdminHeader title="Platform Settings" />
        <div className="dashboard-content">
          <div className="settings-container">
            {/* Sidebar for settings sections */}
            <div className="settings-sidebar">
               <ul>
                 <li className="active"><SettingsIcon size={18}/> General</li>
                 <li><Shield size={18}/> Security</li>
                 <li><Bell size={18}/> Notifications</li>
               </ul>
            </div>
            
            {/* Main settings content */}
            <div className="settings-content">
               <div className="settings-card">
                 <h2>Appearance</h2>
                 <p className="settings-desc">Customize how the dashboard looks on your device.</p>
                 
                 <div className="setting-item">
                    <div className="setting-info">
                       <h4>Theme Preference</h4>
                       <p>Toggle between dark and light mode for the dashboard interface.</p>
                    </div>
                    <div className="setting-action">
                       <button className={`theme-toggle ${isLightMode ? 'light' : 'dark'}`} onClick={toggleTheme}>
                         {isLightMode ? (
                           <><Sun size={18} /> Light Mode Active</>
                         ) : (
                           <><Moon size={18} /> Dark Mode Active</>
                         )}
                       </button>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
