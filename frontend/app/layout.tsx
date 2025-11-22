import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'HedgePod Agent | Autonomous Cross-Chain DeFi',
  description: 'Deposit once. AI agents automatically rebalance across 8+ chains for optimal yield.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
