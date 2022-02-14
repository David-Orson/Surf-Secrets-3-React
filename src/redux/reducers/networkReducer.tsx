// action types
import { SET_AUTH, REMOVE_AUTH } from '../types';

// models
import { Network } from '../../api/models';

const initialState: Network = {
    apiUrl: 'http://localhost:8085',
    auth: { token: '' },
} as Network;

const authReducer: any = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: {
                    token: action.payload,
                },
            };

        case REMOVE_AUTH:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
