// npm
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// mui
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

// hooks
import { useActions } from '../../redux/actions';

// components
import Login from './Login';
import Signup from './Signup';

const Navbar = () => {
    // hooks
    const { isAuthenticated } = useActions();

    // reactive
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);

    return (
        <div>
            <AppBar>
                {!isAuthenticated() ? (
                    <Toolbar>
                        <Container sx={{ flexGrow: 1 }}>
                            <Button color="primary" component={Link} to="/">
                                Leaderboard
                            </Button>
                        </Container>
                        <Button
                            color="primary"
                            onClick={() => setIsLoginVisible(true)}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsSignupVisible(true)}
                        >
                            Signup
                        </Button>
                    </Toolbar>
                ) : (
                    <Toolbar>
                        <Container sx={{ flexGrow: 1 }}>
                            <Button color="primary" component={Link} to="/">
                                Leaderboard
                            </Button>

                            <Button
                                color="primary"
                                component={Link}
                                to="/match-finder"
                            >
                                Match Finder
                            </Button>
                        </Container>
                        <Button color="primary" component={Link} to="/profile">
                            Profile
                        </Button>
                    </Toolbar>
                )}
            </AppBar>
            <Modal
                open={isLoginVisible}
                onClose={() => setIsLoginVisible(false)}
            >
                <Box
                    className="absolute bg-slate-50 w-1/3 top-1/2 left-1/2"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <Login setIsLoginVisible={setIsLoginVisible} />
                </Box>
            </Modal>
            <Modal
                open={isSignupVisible}
                onClose={() => setIsSignupVisible(false)}
            >
                <Box
                    className="absolute bg-slate-50 w-1/3 margin-auto top-1/2 left-1/2"
                    sx={{ transform: 'translate(-50%, -50%)' }}
                >
                    <Signup setIsSignupVisible={setIsSignupVisible} />
                </Box>
            </Modal>
        </div>
    );
};

export default Navbar;
