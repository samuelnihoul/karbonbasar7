import { Suspense, StrictMode } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './global.css'
export const metadata = {
  title: 'Karbon Basar',
  description: 'Emission Reductions with Rewards',
}
import ReduxProvider from './components/ReduxProvider'
import { HashConnectClient } from './components/HashButton'
import { ThemeProvider } from './theme'
import { CssBaseline } from '@mui/material'
import { i18n } from './i18n'
import { I18nextProvider } from 'react-i18next'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ReduxProvider>
            <HashConnectClient />
            <ThemeProvider>
              <CssBaseline />
              <I18nextProvider i18n={i18n}>
                <Navbar />
                {children}
                <Footer /></I18nextProvider>
            </ThemeProvider>
          </ReduxProvider>
        </Suspense>
      </body>
    </html>
  )
}


