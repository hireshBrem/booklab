import './globals.css'
import type { Metadata } from 'next'
import { Inter, Martian_Mono } from 'next/font/google'
import MainNavbar from './components/MainNavbar'
import AuthProvider from './components/AuthProvider'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
    subsets: ['latin'],
    variable: '--font-inter',
})

const martianMono = Martian_Mono({
    subsets: ['latin'],
    variable: '--font-martian-mono',
})


export const metadata: Metadata = {
  title: 'BookLab | Collaborative Reading Platform',
  description: 'The first collaborative book reading platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${inter.variable} ${martianMono.variable} bg-gray-900`}>
            <AuthProvider>
                <MainNavbar />
                {children}
                <Analytics />
                <Footer />
            </AuthProvider>
        </body>
    </html>
  )
}
