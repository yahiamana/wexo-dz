'use client'

import { Menu, Bell, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { usePathname } from 'next/navigation'

interface AdminTopBarProps {
  onMenuClick: () => void
}

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const pathname = usePathname()
  
  // Generate simple breadcrumb title
  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean)
    const current = parts[parts.length - 1]
    
    if (current === 'dashboard') return 'Dashboard'
    if (current === 'contacts') return 'Contacts'
    if (current === 'services') return 'Services'
    if (current === 'pricing') return 'Pricing & Plans'
    if (current === 'portfolio') return 'Portfolio Projects'
    if (current === 'testimonials') return 'Testimonials'
    
    return current.charAt(0).toUpperCase() + current.slice(1)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize tracking-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search (Placeholder for future) */}
        <div className="hidden md:flex items-center px-3 py-2 bg-gray-100 dark:bg-slate-900 rounded-full border border-transparent focus-within:border-blue-500 transition-colors w-64">
           <Search className="w-4 h-4 text-gray-400 mr-2" />
           <input 
             type="text" 
             placeholder="Search..." 
             className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white w-full placeholder:text-gray-500"
           />
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 hidden md:block" />

        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
        </button>
        
        <ThemeToggle />
      </div>
    </header>
  )
}
