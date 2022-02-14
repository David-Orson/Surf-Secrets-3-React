import { SET_AUTH, REMOVE_AUTH } from '../types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

export const useNetworkActions = () => {
    const dispatch = useDispatch();
    const account = useSelector((state: RootState) => state.account);

    const setAuthToken = (authToken: any) => {
        localStorage.setItem('authToken', authToken.token);
        dispatch({
            type: SET_AUTH,
            payload: authToken.token,
        });
    };

    const removeAuthToken = () => {
        localStorage.removeItem('authToken');
        dispatch({
            type: REMOVE_AUTH,
        });
    };

    const isAuthenticated = () => !!account;

    return {
        setAuthToken,
        removeAuthToken,
        isAuthenticated,
    };
};
