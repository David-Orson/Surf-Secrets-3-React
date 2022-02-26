// npm
import React, { useState, FormEvent } from 'react';

// mui
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// hooks
import { useServices } from '../../api/services';

// models
import { LoginCreds } from '../../api/models';

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
    const [errors, setErrors] = useState({
        error: false,
        email: { value: false, text: '' },
        password: { value: false, text: '' },
    });

    // props
    let tempErrors = {
        error: false,
        email: { value: false, text: '' },
        password: { value: false, text: '' },
    };

    // methods
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

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

        if (tempErrors.error) {
            setErrors(tempErrors);
            setIsLoading(false);
            return;
        }

        const loginCreds = {} as LoginCreds;

        loginCreds.email = email;
        loginCreds.password = password;

        await logIn(loginCreds);

        setIsLoading(false);
        props.setIsLoginVisible(false);
    };

    return (
        <div className="bg-stone-900 flex justify-center flex-col items-center p-6">
            <div className="m-4">
                <Typography variant="h4" color="white">
                    Login
                </Typography>
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
                <LoadingButton
                    sx={{ marginTop: 2 }}
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
