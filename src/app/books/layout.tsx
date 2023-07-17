import type { Metadata } from 'next'
import Navbar from '../components/Navbar'

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
    <div>
        <Navbar />
        {children}
    </div>
  )
}
