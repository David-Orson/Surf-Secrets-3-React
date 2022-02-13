// action types
import { SET_ACCOUNT, REMOVE_ACCOUNT } from '../types';

// models
import { Account } from '../../api/models';

const initialState: Account = {} as Account;

const accountReducer: any = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                ...action.payload,
            };

        case REMOVE_ACCOUNT:
            return initialState;
        default:
            return state;
    }
};

export default accountReducer;
