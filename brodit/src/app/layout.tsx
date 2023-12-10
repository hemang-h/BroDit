import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { Web3ModalProvider } from '../../contextx/WalletProvider/WalletProvider'

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brodit',
  description: 'Brodit tightens the trust between an auditor and client'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}
