import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './pages/_app';
import { HashConnectClient } from './components/HashButton.tsx';
import { store } from './store'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashConnectClient />
        <ThemeProvider>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>
); 
