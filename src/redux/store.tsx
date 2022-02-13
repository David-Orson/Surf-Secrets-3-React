// npm
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// dev tools later, weird error
// import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import accountReducer from './reducers/accountReducer';
import networkReducer from './reducers/networkReducer';

// models
import { Account, Network } from '../api/models';

export interface InitialState {
    account: Account;
    network: Network;
}

const initialState: InitialState = {
    account: {} as Account,
    network: {
        apiUrl: 'http://localhost:8085',
        auth: { token: '' },
    } as Network,
};

const middleware = [thunk];

const reducers = combineReducers({
    network: networkReducer,
    account: accountReducer,
});

export type RootState = {} & {
    network: Network;
    account: Account;
};

const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
