import { OPEN_TOAST, CLOSE_TOAST } from '../types';

import { useDispatch } from 'react-redux';

export const useUIActions = () => {
    const dispatch = useDispatch();

    const openToast = (severity: string, ...messages: string[]) => {
        let m = [...messages];
        dispatch({
            type: OPEN_TOAST,
            payload: { severity, messages: m[0] },
        });
    };

    const closeToast = () => {
        dispatch({
            type: CLOSE_TOAST,
        });
    };

    return {
        openToast,
        closeToast,
    };
};
