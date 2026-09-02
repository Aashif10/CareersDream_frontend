import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Schools from './pages/Schools';
import Assessment from './pages/assessment';
import Assessment1 from './pages/assessment1';
import Register from './pages/Register';
import Login from './pages/Login';
import FAQ from './pages/faq';
import ContactUs from './pages/contactus';
import Privacy from './pages/privacy';
import PersonalityTest from './pages/personalitytest';
import AdminDashboard from './AdminDashboard';
import Team from './AdminDashboard/addmember';
import TeamList from './AdminDashboard/teamlist';
import RegistrationList from './AdminDashboard/registrationlist';
import AdminLogin from './AdminDashboard/Adminlogin';
import Support from './AdminDashboard/support';
import Settings from './AdminDashboard/settings';
import AdminProfile from './AdminDashboard/adminprofile';
import Subscribers from './AdminDashboard/subscribers';
import AdminQuestions from './AdminDashboard/adminquestions';
import AdminReports from './AdminDashboard/adminreports';
import AdminProtectedRoute from './AdminDashboard/AdminProtectedRoute';
import './index.css';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, []);

  return (
    <div className="app-container">
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment1" element={<Assessment1 />} />
          <Route path="/test7k-9xqv28mnp" element={<PersonalityTest />} />
          {/* Placeholders for other routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/questions" element={<AdminProtectedRoute><AdminQuestions /></AdminProtectedRoute>} />
          <Route path="/admin/test-reports" element={<AdminProtectedRoute><AdminReports /></AdminProtectedRoute>} />
          <Route path="/admin/team" element={<AdminProtectedRoute><TeamList /></AdminProtectedRoute>} />
          <Route path="/admin/add-member" element={<AdminProtectedRoute><Team /></AdminProtectedRoute>} />
          <Route path="/admin/team-list" element={<AdminProtectedRoute><TeamList /></AdminProtectedRoute>} />
          <Route path="/admin/registrationlist" element={<AdminProtectedRoute><RegistrationList /></AdminProtectedRoute>} />
          <Route path="/admin/subscribers" element={<AdminProtectedRoute><Subscribers /></AdminProtectedRoute>} />
          <Route path="/admin/newsletter" element={<AdminProtectedRoute><Subscribers /></AdminProtectedRoute>} />
          <Route path="/admin/support" element={<AdminProtectedRoute><Support /></AdminProtectedRoute>} />
          <Route path="/admin/settings" element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />
          <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />

          {/* Admin Public Login Route */}
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
