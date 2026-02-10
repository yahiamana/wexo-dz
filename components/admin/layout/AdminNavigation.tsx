'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Users, MessageSquare, FolderOpen, Briefcase, Settings, LogOut, ChevronLeft, Folder, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminNavigationProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Lead Intelligence', href: '/admin/contacts', icon: Users },
  { label: 'Strategic Solutions', href: '/admin/services', icon: Briefcase },
  { label: 'Experience Log', href: '/admin/portfolio', icon: FolderOpen },
  { label: 'Market Sectors', href: '/admin/categories', icon: Folder },
  { label: 'Partner Trust', href: '/admin/testimonials', icon: MessageSquare },
]

export function AdminNavigation({ isOpen, onClose }: AdminNavigationProps) {
  const pathname = usePathname()

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Desktop/Mobile Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl lg:shadow-none">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800/50">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20 flex-shrink-0">
          <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">Admin<span className="text-indigo-600">Panel</span></span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                   isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                )} />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active-nav" className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </Link>
          )
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <button 
           onClick={async () => {
            try {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            } catch (e) {
              console.error(e);
            }
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 shadow-2xl lg:hidden"
          >
             <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Static) - Only visible on large screens */}
      {/* Note: The parent layout handles the width/margin of the content. This component just renders the sidebar element. */}
      {/* We use a new simplified structure where the sidebar is fixed on desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-72">
        <SidebarContent />
      </div>
    </>
  )
}
