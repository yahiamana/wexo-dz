import '../globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for portfolio management',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-100 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
