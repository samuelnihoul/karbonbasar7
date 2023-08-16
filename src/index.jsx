import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './pages/_app.jsx';
import { HashConnectClient } from './components/HashButton.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashConnectClient></HashConnectClient>
            <App /></Provider>
    </React.StrictMode>
); 
