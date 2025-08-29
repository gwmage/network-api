import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ProfileManagement from './components/ProfileManagement';
import AppInformation from './components/AppInformation';
import MatchingResults from './components/MatchingResults';
import ReservationSearch from './components/ReservationSearch';
import ReservationProcess from './components/ReservationProcess';
import ReservationConfirmation from './components/ReservationConfirmation';
import ReservationManagement from './components/ReservationManagement';
import ErrorDisplay from './components/ErrorDisplay';
import NotificationSettings from './components/NotificationSettings';
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import axios from 'axios';
import Main from './components/Main';
import SignUp from './components/SignUp'; // Make sure this import is correct
import LoginForm from './components/LoginForm'; // Import LoginForm
import RegisterForm from './components/RegisterForm'; // Import RegisterForm
import AdminLogin from './components/AdminLogin';
import AdminPermissions from './components/AdminPermissions';
import UserEdit from './components/UserEdit';
// ... other imports

const App = () => {
  // ... your existing code ...

  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;