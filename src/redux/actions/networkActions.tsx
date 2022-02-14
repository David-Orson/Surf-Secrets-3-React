import { SET_AUTH, REMOVE_AUTH } from '../types';

import { useDispatch } from 'react-redux';

export const useNetworkActions = () => {
    const dispatch = useDispatch();

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

    return {
        setAuthToken,
        removeAuthToken,
    };
};
