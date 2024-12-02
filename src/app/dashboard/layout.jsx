'use client'; 
// import { NavLinks } from "@components/NavLinks"
import dynamic from 'next/dynamic'
import NavLinks from '@/components/NavLinks'

// const NavLinks = dynamic(() => import('@/components/NavLinks'), { ssr: false })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
        <NavLinks/>
        {children}
        </main>
      </body>
    </html>
  );
}
