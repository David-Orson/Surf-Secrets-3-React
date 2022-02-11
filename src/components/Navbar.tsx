// npm
import React from 'react';
import { Link } from 'react-router-dom';

// mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navbar = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Signup</Button>
                    <Button color="inherit" component={Link} to="/profile">
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/match-finder">
                        Match Finder
                    </Button>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
