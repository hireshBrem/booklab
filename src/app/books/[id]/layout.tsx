import type { Metadata } from 'next'
import Navbar from '@/app/components/Navbar'
import Script from 'next/script'

// export const metadata = {
//   title: 'BookLab | Collaborative Reading Platform',
//   description: 'The first collaborative book reading platform',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>        
        {children}
    </div>
  )
}
