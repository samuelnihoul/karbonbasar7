import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/_app.jsx';
import { HashConnectAPIProvider } from './lib/hashconnect.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashConnectAPIProvider>
        <App />
    </HashConnectAPIProvider>
); 
