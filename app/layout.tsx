"use client"

import './globals.css'
import { Inter } from 'next/font/google'
// import Header from './_components/header/header'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen overflow-hidden flex flex-col bg-slate-50"}>
        {children}
      </body>
    </html>
  )
};
