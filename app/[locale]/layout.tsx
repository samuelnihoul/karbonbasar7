import { Suspense, StrictMode } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../global.css'
export const metadata = {
  title: 'Karbon Basar',
  description: 'Emission Reductions with Rewards',
}
import ReduxProvider from '../components/ReduxProvider'
import { HashConnectClient } from '../components/HashButton'
import { ThemeProvider } from '../theme'
import { CssBaseline } from '@mui/material'
import I18nextProvider from '../../i18nConfig'
import React from 'react'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Loading...</p>}>
          <ReduxProvider>
            <HashConnectClient />
            <ThemeProvider>
              <CssBaseline />
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </ReduxProvider>
        </Suspense>
      </body>
    </html >
  )
}


