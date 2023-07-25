import type { Metadata } from 'next'
import Navbar from '@/app/components/Navbar'

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
         <script src="https://acrobatservices.adobe.com/view-sdk/viewer.js"></script>

        {children}
    </div>
  )
}
