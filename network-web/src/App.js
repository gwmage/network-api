import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CommunityBoard from './components/CommunityBoard';
import PostDetails from './components/PostDetails';
import MatchingProgress from './components/MatchingProgress';
import './index.css'; // Import the CSS file

// ... other imports

const App = () => {
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