// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Property Portal',
  description: 'Find new build homes easily',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="fixed top-0 w-full z-50">
          <Header />
        </div>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}