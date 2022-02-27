import { OPEN_TOAST, CLOSE_TOAST } from '../types';

import { useDispatch } from 'react-redux';

export const useUIActions = () => {
    const dispatch = useDispatch();

    const openToast = () => {
        dispatch({
            type: OPEN_TOAST,
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
