// npm
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// dev tools later, weird error
// import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import accountReducer from './reducers/accountReducer';
import networkReducer from './reducers/networkReducer';
import uiReducer from './reducers/uiReducer';

// models
import { Account, Network, UI } from '../api/models';

export interface InitialState {
    account: Account;
    network: Network;
    ui: UI;
}

const initialState: InitialState = {
    account: JSON.parse(localStorage.getItem('account') as string) as Account,
    network: {
        apiUrl: 'http://localhost:8085',
        auth: {
            token: localStorage.getItem('authToken'),
        },
    } as Network,
    ui: { toast: { isOpen: false, severity: undefined, messages: [''] } } as UI,
};

const middleware = [thunk];

const reducers = combineReducers({
    network: networkReducer,
    account: accountReducer,
    ui: uiReducer,
});

export type RootState = {} & {
    network: Network;
    account: Account;
    ui: UI;
};

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
