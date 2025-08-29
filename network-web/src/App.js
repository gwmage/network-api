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
import SignUp from './components/SignUp';
import Login from './components/Login';
import MatchingProgress from './components/MatchingProgress'; 


const App = () => {
  // ... existing code ...

  return (
    <Router>
      <nav>
        {/* Example navigation links */}
        <Link to="/community">Community Board</Link>
        <Link to="/matching">Matching</Link> {/* Example link to matching */}
        {/* ... other navigation links */}
      </nav>
      <Routes>
        {/* ... other routes ... */}
        <Route path="/community" element={<CommunityBoard />} />
        <Route path="/community/:postId" element={<PostDetails />} />
        <Route path="/matching" element={<MatchingProgress />} /> {/* Add the route for MatchingProgress */}
      </Routes>
    </Router>
  );
};

export default App;
