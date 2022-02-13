// npm
import { useSelector } from 'react-redux';

// hooks
import { useAxios } from '../../hooks/axiosHook';
import { useAccountService } from './accountService';
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
        const res = await axios.post(
            `${apiUrl}/auth/login`,
            loginCreds,
            false,
            5000
        );
        return res.data;
    };

    const logIn = async (loginCreds: LoginCreds) => {
        const token = (await getToken(loginCreds)) as any;

        const account = await getAccount(token.accountId);
    };

    const signUp = async (signupCreds: SignupCreds) => {
        const p1 = await axios.post(`${apiUrl}/auth/signup`, signupCreds);
        const p2 = getToken(signupCreds);

        const account = await p1.data;
        const token = await p2;

        setAccount(account);
        setAuthToken(token);
    };

    return {
        getToken,
        logIn,
        signUp,
    };
};
