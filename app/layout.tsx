import { Suspense, StrictMode } from 'react'
import Footer from '../components/Footer'
import Navbar from '@/components/Navbar'
import './global.css'
export const metadata = {
  title: 'Karbon Basar',
  description: 'Emission Reductions with Rewards',
}
import ReduxProvider from '../components/ReduxProvider'
import { HashConnectClient } from '../components/HashButton'
import { ThemeProvider } from '../theme'
import React from 'react'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html >
      <body>
        <StrictMode>
          <Suspense fallback={<p className='text-center m-auto h-[100vh]'>Loading...</p>}>
            <ReduxProvider>
              <HashConnectClient />
              <ThemeProvider>
                <Navbar />
                {children}
                <Footer />
              </ThemeProvider>
            </ReduxProvider>
          </Suspense></StrictMode>
      </body>
    </html >
  )
}


