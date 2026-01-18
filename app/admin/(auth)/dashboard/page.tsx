'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, FolderOpen, MessageSquare, Briefcase, DollarSign, Plus } from 'lucide-react'
import { PageHeader } from '@/components/admin/layout/PageHeader'
import { StatWidget } from '@/components/admin/ui/StatWidget'
import { DashboardCard } from '@/components/admin/ui/DashboardCard'
import Link from 'next/link'

interface Stats {
  contacts: number
  services: number
  websiteTypes: number
  projects: number
  testimonials: number
  unreadContacts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    contacts: 0,
    services: 0,
    websiteTypes: 0,
    projects: 0,
    testimonials: 0,
    unreadContacts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contacts, services, pricing, portfolio, testimonials] = await Promise.all([
          fetch('/api/contacts').then(r => r.ok ? r.json() : []),
          fetch('/api/services').then(r => r.ok ? r.json() : []),
          fetch('/api/pricing').then(r => r.ok ? r.json() : []),
          fetch('/api/portfolio').then(r => r.ok ? r.json() : []),
          fetch('/api/testimonials').then(r => r.ok ? r.json() : []),
        ])
        
        const safeArray = (data: any) => Array.isArray(data) ? data : [];
        const contactsData = safeArray(contacts);

        setStats({
          contacts: contactsData.length || 0,
          services: safeArray(services).length || 0,
          websiteTypes: safeArray(pricing).length || 0,
          projects: safeArray(portfolio).length || 0,
          testimonials: safeArray(testimonials).length || 0,
          unreadContacts: contactsData.filter((c: { isRead: boolean }) => !c.isRead).length || 0,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening today."
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatWidget 
            label="Total Contacts" 
            value={stats.contacts} 
            icon={Mail} 
            color="indigo"
            trend={stats.unreadContacts > 0 ? { value: stats.unreadContacts, positive: true } : undefined}
          />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatWidget 
            label="Active Services" 
            value={stats.services} 
            icon={Briefcase} 
            color="emerald"
          />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <StatWidget 
            label="Projects" 
            value={stats.projects} 
            icon={FolderOpen} 
            color="amber"
          />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <StatWidget 
            label="Testimonials" 
            value={stats.testimonials} 
            icon={MessageSquare} 
            color="rose"
          />
        </motion.div>
      </div>
      )}

      {/* Quick Actions */}
      <div className="mt-16 sm:mt-20">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Add Project', href: '/admin/portfolio', icon: FolderOpen, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' },
            { label: 'Add Service', href: '/admin/services', icon: Briefcase, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' },
            { label: 'View Messages', href: '/admin/contacts', icon: Mail, color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20' },
            { label: 'Update Pricing', href: '/admin/pricing', icon: DollarSign, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
          ].map((action, i) => (
             <Link 
              key={action.label} 
              href={action.href}
              className="group flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200"
            >
              <div className={`p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {action.label}
              </span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                <Plus className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
