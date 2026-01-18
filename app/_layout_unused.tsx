import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WebAgency - Professional Websites That Grow Your Business',
  description: 'We create beautiful, fast, and effective websites that help your business stand out online. Get your professional website today.',
  keywords: ['web design', 'website development', 'web agency', 'professional websites'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
