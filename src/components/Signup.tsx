// npm
import React, { useState, FormEvent } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// models
import { SignupCreds } from '../api/models';

// services
import { useServices } from '../api/services';

interface Props {
    setIsSignupVisible: Function;
}

const Signup = (props: Props) => {
    const { signUp } = useServices();

    // reactive
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // methods
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log('passwords do not match');
            setIsLoading(false);
            return;
        }

        const signupCreds = {} as SignupCreds;

        signupCreds.username = username;
        signupCreds.email = email;
        signupCreds.password = password;

        await signUp(signupCreds);

        setIsLoading(false);
        props.setIsSignupVisible(false);
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
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                >
                    Signup
                </LoadingButton>
            </form>
        </div>
    );
};

export default Signup;
