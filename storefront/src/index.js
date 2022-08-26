import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import Store from './store/Store';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import setup from './setup/setup';

const root = ReactDOM.createRoot(document.getElementById('root'));
(async () => {
    await setup();
    root.render(
        <Provider store={Store}>
            <AppRouter />
        </Provider>
    );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
