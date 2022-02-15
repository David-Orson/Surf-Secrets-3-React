// npm
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// views
import Leaderboard from './views/Leaderboard';
import Profile from './views/Profile';
import MatchFinder from './views/MatchFinder';
import MatchOverview from './views/MatchOverview';

const App = () => {
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
                        <Route path="/match/:id" element={<MatchOverview />} />
                        <Route path="/match-finder" element={<MatchFinder />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
