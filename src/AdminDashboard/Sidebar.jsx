import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Users, FileText, Settings, Bell, 
  Mail, HelpCircle, LogOut, Briefcase, ChevronDown, UserPlus, List, MailCheck
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activePage }) => {
  const [teamOpen, setTeamOpen] = useState(activePage === 'team');
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/adminlogin');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Briefcase size={22} />
        </div>
        <h2>Careers<span style={{ color: '#c29903ff' }}>Dream</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className={activePage === 'dashboard' ? 'active' : ''}>
            <a href="/admin"><LayoutDashboard size={20} /> Dashboard</a>
          </li>
          <li className={activePage === 'analytics' ? 'active' : ''}>
            <a href="#"><Activity size={20} /> Analytics</a>
          </li>

          {/* Team Members Dropdown */}
          <li className={`has-dropdown ${activePage === 'team' ? 'active' : ''} ${teamOpen ? 'open' : ''}`}>
            <button
              className="dropdown-toggle"
              onClick={() => setTeamOpen(!teamOpen)}
              aria-expanded={teamOpen}
            >
              <span className="nav-label"><Users size={20} /> Team</span>
              <ChevronDown size={16} className={`chevron ${teamOpen ? 'rotated' : ''}`} />
            </button>
            <ul className={`dropdown-menu ${teamOpen ? 'show' : ''}`}>
              <li>
                <a href="/admin/add-member">
                  <UserPlus size={16} /> Add Member
                </a>
              </li>
              <li>
                <a href="/admin/team-list">
                  <List size={16} /> Team List
                </a>
              </li>
            </ul>
          </li>

          <li className={activePage === 'subscribers' ? 'active' : ''}>
            <a href="/admin/subscribers"><MailCheck size={20} /> Subscribers</a>
          </li>
          <li className={activePage === 'registration-list' ? 'active' : ''}>
            <a href="/admin/registrationlist"><FileText size={20} /> User List</a>
          </li>
          <li className={activePage === 'settings' ? 'active' : ''}>
            <a href="/admin/settings"><Settings size={20} /> Settings</a>
          </li>
          <li className="nav-divider"></li>
          <li>
            <a href="#"><Bell size={20} /> Notifications</a>
          </li>
          <li>
            <a href="#">
              <Mail size={20} /> Messages 
              <span className="badge">3</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <ul>
          <li>
            <a href="/admin/support" className={activePage === 'support' ? 'active' : ''}><HelpCircle size={20} /> Support</a>
          </li>
          <li>
            <a href="#" onClick={handleLogout} className="logout-link"><LogOut size={20} /> Logout</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
