// action types
import { OPEN_TOAST, CLOSE_TOAST } from '../types';

// models
import { UI } from '../../api/models';

const initialState: UI = {
    toast: {
        isOpen: false,
        severity: undefined,
        messages: [''],
    },
} as UI;

const uiReducer: any = (state = initialState, action: any) => {
    switch (action.type) {
        case OPEN_TOAST:
            return {
                ...state,
                toast: { isOpen: true, ...action.payload },
            };
        case CLOSE_TOAST:
            return { toast: { ...state.toast, isOpen: false } };
        default:
            return state;
    }
};

export default uiReducer;
