'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  DollarSign, 
  FolderOpen, 
  MessageSquare,
  LogOut,
  ChevronLeft,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onLogout: () => void
  adminName?: string
  adminEmail?: string
}

export function AdminSidebar({ 
  isOpen, 
  setIsOpen, 
  onLogout,
  adminName,
  adminEmail 
}: AdminSidebarProps) {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/admin/portfolio', label: 'Portfolio', icon: FolderOpen },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  ]

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl border-r border-gray-100 dark:border-slate-800",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-slate-800">
          <Link href="/admin/dashboard" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              A
            </div>
            <span className="font-bold text-lg tracking-tight">Admin<span className="text-blue-600">Panel</span></span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Overview
          </p>
          {navItems.slice(0, 1).map((item) => {
             const isActive = pathname === item.href
             return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium",
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                )} />
                <span>{item.label}</span>
              </Link>
             )
          })}

          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">
            Management
          </p>
          {navItems.slice(1).map((item) => {
             const isActive = pathname === item.href
             return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium",
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                )} />
                <span>{item.label}</span>
              </Link>
             )
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
          <Link
             href="/"
             target="_blank"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all mb-2"
          >
             <ChevronLeft className="w-5 h-5" />
             <span className="font-medium">View Website</span>
          </Link>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/50">
            <div className="w-9 h-9 bg-blue-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-slate-600">
              {adminName?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{adminName || 'Admin'}</p>
              <button onClick={onLogout} className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors">
                 <LogOut className="w-3 h-3" /> Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
