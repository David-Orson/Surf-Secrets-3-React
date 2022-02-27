// action types
import { OPEN_TOAST, CLOSE_TOAST } from '../types';

// models
import { UI } from '../../api/models';

const initialState: UI = {
    isToastOpen: false,
} as UI;

const uiReducer: any = (state = initialState, action: any) => {
    switch (action.type) {
        case OPEN_TOAST:
            return {
                ...state,
                isToastOpen: true,
            };

        case CLOSE_TOAST:
            return initialState;
        default:
            return state;
    }
};

export default uiReducer;
