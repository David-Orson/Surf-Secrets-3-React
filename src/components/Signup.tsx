// npm
import React, { useState, FormEvent } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// models
import { SignupCreds } from '../api/models';

// services
import { useServices } from '../api/services';

const Signup = () => {
    const { signUp } = useServices();

    // reactive
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // methods
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log('passwords do not match');
            return;
        }

        const signupCreds = {} as SignupCreds;

        signupCreds.username = username;
        signupCreds.email = email;
        signupCreds.password = password;

        signUp(signupCreds);
    };

    return (
        <div className="flex justify-center flex-col items-center">
            <div className="m-4">
                <Typography variant="h2">Signup</Typography>
            </div>
            <form
                className="w-full flex justify-center items-center flex-col"
                noValidate
                onSubmit={submit}
            >
                <TextField
                    className="w-80"
                    id="username"
                    name="username"
                    type="username"
                    label="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    margin="normal"
                />
                <TextField
                    className="w-80"
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    margin="normal"
                />
                <TextField
                    className="w-80"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    margin="normal"
                />
                <TextField
                    className="w-80"
                    id="confirm password"
                    name="confirm password"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </form>
        </div>
    );
};

export default Signup;
