import { Suspense, StrictMode } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './global.css'
export const metadata = {
  title: 'Karbon Basar',
  description: 'Emission Reductions with Rewards',
}
import { ThemeProvider } from '../theme'
import React from 'react'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html >
      <body suppressHydrationWarning={true}>
        <Suspense fallback={<p>Loading...</p>}>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html >
  )
}


