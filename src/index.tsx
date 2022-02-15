import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider as Redux } from 'react-redux';
import store from './redux/store';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Redux store={store}>
            <div className="bg-slate-900 h-full w-full">
                <App />
            </div>
        </Redux>
    </React.StrictMode>,
    document.getElementById('root')
);
