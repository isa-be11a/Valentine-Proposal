import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _playfairDisplay = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Will You Be My Valentine?',
  description:
    'An elegant, interactive Valentine\'s Day experience. A sophisticated way to ask someone special. 💕',
  generator: 'v0.app',
  themeColor: '#be185d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
