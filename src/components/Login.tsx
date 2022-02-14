// npm
import React, { useState, FormEvent } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// hooks
import { useServices } from '../api/services';

// models
import { LoginCreds } from '../api/models';

// local types
interface Props {
    setIsLoginVisible: Function;
}

const Login = (props: Props) => {
    // hooks
    const { logIn } = useServices();

    // reactive
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // methods
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

        const loginCreds = {} as LoginCreds;

        loginCreds.email = email;
        loginCreds.password = password;

        await logIn(loginCreds);

        setIsLoading(false);
        props.setIsLoginVisible(false);
    };

    return (
        <div className="flex justify-center flex-col items-center">
            <div className="m-4">
                <Typography variant="h2">Login</Typography>
            </div>
            <form
                className="w-full flex justify-center items-center flex-col"
                noValidate
                onSubmit={submit}
            >
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
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={isLoading}
                >
                    Login
                </LoadingButton>
            </form>
        </div>
    );
};

export default Login;
