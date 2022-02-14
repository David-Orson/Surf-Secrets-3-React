// npm
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// views
import Leaderboard from './views/Leaderboard';
import Profile from './views/Profile';
import Match from './views/Match';
import MatchFinder from './views/MatchFinder';
import { useSelector } from 'react-redux';

const App = () => {
    const state = useSelector((state) => state);
    // just for redux debugging for now
    setInterval(() => {
        console.log(state);
    }, 3000);
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="router-view">
                    <Routes>
                        <Route path="/" element={<Leaderboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
                        <Route path="/match" element={<Match />} />
                        <Route path="/match-finder" element={<MatchFinder />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
