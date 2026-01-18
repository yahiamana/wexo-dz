'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {error.message || 'An unexpected error occurred in the admin panel.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </button>
          
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 text-left">
            <p className="text-xs font-mono text-red-500 break-words bg-red-50 dark:bg-red-950/30 p-2 rounded">
              {error.stack}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
