import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Accessibility Toolkit',
  description: 'A toolkit for making your site more accessible.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
