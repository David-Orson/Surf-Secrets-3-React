// npm
import React, { useState, FormEvent } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// models
import { SignupCreds } from '../../api/models';

// services
import { useServices } from '../../api/services';

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
    const [errors, setErrors] = useState({
        error: false,
        username: { value: false, text: '' },
        email: { value: false, text: '' },
        password: { value: false, text: '' },
        confirm: { value: false, text: '' },
    });

    // props
    let tempErrors = {
        error: false,
        username: { value: false, text: '' },
        email: { value: false, text: '' },
        password: { value: false, text: '' },
        confirm: { value: false, text: '' },
    };

    // methods
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        if (
            !String(username)
                .toLowerCase()
                .match(/^.{3,50}$/)
        ) {
            tempErrors = {
                ...tempErrors,
                error: true,
                username: {
                    value: true,
                    text: 'Username must be at least 3 characters',
                },
            };
        }

        if (
            !String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            tempErrors = {
                ...tempErrors,
                error: true,
                email: { value: true, text: 'Valid email required' },
            };
        }

        if (
            !String(password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
        ) {
            tempErrors = {
                ...tempErrors,
                error: true,
                password: {
                    value: true,
                    text: 'Password must be 6-20 characters, must have 1 uppercase letter and 1 number',
                },
            };
        }

        if (password !== confirmPassword) {
            tempErrors = {
                ...tempErrors,
                error: true,
                confirm: {
                    value: true,
                    text: 'Passwords must match',
                },
            };
        }

        if (tempErrors.error) {
            setErrors(tempErrors);
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
        <div className="bg-stone-900 flex justify-center flex-col items-center p-4">
            <div className="m-4">
                <Typography variant="h4" color="white">
                    Signup
                </Typography>
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
                    error={errors.username.value}
                    helperText={errors.username.text}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    margin="normal"
                    required
                />
                <TextField
                    className="w-80"
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    error={errors.email.value}
                    helperText={errors.email.text}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    margin="normal"
                    required
                />
                <TextField
                    className="w-80"
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    error={errors.password.value}
                    helperText={errors.password.text}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    margin="normal"
                    required
                />
                <TextField
                    className="w-80"
                    id="confirm password"
                    name="confirm password"
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    error={errors.confirm.value}
                    helperText={errors.confirm.text}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    margin="normal"
                    required
                />
                <LoadingButton
                    sx={{ marginTop: 2, marginBottom: 1 }}
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
