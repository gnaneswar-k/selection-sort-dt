import './globals.css'
import { Inter } from 'next/font/google'
import StoreProvider from './StoreProvider'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Driving Test - Selection Sort',
  description: 'An Algodynamics Driving Test for selection sort',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen overflow-hidden flex flex-col bg-slate-50"}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}

// Export Layout with the store.
export default RootLayout
