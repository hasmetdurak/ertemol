import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Ertemol — Amateur Live Commentary for 2026 FIFA World Cup',
  description:
    'Pick your language, pick your match, and listen to volunteer commentators live. VLC compatible HLS audio streams.',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-fg">
        <Providers>
          <Nav />
          <main className="max-w-6xl mx-auto px-4 py-4 sm:py-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
