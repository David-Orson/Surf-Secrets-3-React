// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';
import { useAccountService } from './account';
import { useActions } from '../../redux/actions';

// models
import { LoginCreds, SignupCreds } from '../models';
import { RootState } from '../../redux/store';

export const useAuthService = () => {
    // hooks
    const axios = useAxios();
    const { getAccount } = useAccountService();
    const { setAccount, setAuthToken } = useActions();

    // properties
    const apiUrl = useSelector((state: RootState) => state.network.apiUrl);

    const getToken = async (loginCreds: LoginCreds) => {
        const res = await axios.post(`${apiUrl}/auth/login`, loginCreds, false);
        return res.data;
    };

    const logIn = async (loginCreds: LoginCreds) => {
        const token = await getToken(loginCreds);
        const account = await getAccount(token.username);

        setAccount(account);
        setAuthToken(token);
    };

    const signUp = async (signupCreds: SignupCreds) => {
        const { data: account } = await axios.post(
            `${apiUrl}/auth/signup`,
            signupCreds
        );
        const token = await getToken(signupCreds);

        setAccount(account);
        setAuthToken(token);
    };

    return {
        getToken,
        logIn,
        signUp,
    };
};
