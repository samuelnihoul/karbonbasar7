import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './pages/_app.jsx';
import { HashConnectClient } from './components/HashButton.tsx';
import { store } from './store'
import { Buffer } from 'buffer'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './theme'
import { Analytics } from '@vercel/analytics'
// window.Buffer = window.Buffer || Buffer
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Analytics />
        <React.StrictMode>
            <Provider store={store}>
                <HashConnectClient />
                <ThemeProvider>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    </>
); 
