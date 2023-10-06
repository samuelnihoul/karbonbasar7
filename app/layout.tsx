import { Suspense, StrictMode } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './global.css'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
import ReduxProvider from './components/ReduxProvider'
import { HashConnectClient } from './components/HashButton'
import { ThemeProvider } from './theme'
import { CssBaseline } from '@mui/material'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><Suspense>
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
    </html>
  )
}


