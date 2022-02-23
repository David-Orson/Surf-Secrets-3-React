// npm
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// mui
import { createTheme, ThemeProvider } from '@mui/material/styles';

// components
import Navbar from './ui/components/Navbar';

// views
import Leaderboard from './ui/views/Leaderboard';
import Profile from './ui/views/Profile';
import MatchFinder from './ui/views/MatchFinder';
import MatchOverview from './ui/views/MatchOverview';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
};

export default App;
