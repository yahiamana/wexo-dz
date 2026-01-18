'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function AdminHeader({ 
  title, 
  description, 
  children,
  className 
}: AdminHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
            {description}
          </p>
        )}
      </div>
      
      {children && (
        <div className="flex items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  )
}
