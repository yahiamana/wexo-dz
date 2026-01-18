'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminShell } from '@/components/admin/layout/AdminShell'

interface Admin {
  id: string
  email: string
  name: string
}

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth')
        const data = await response.json()
        
        if (!response.ok || !data.admin) {
           router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }
  
  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}
