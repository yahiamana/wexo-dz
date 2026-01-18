'use client'

import { cn } from '@/lib/utils'

interface AdminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  noPadding?: boolean
}

export function AdminCard({ 
  children, 
  className, 
  noPadding = false,
  ...props 
}: AdminCardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200",
        !noPadding && "p-6 sm:p-8",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}
