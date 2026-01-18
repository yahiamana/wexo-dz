import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

interface DataGridProps<T> {
  columns: {
    key: string
    header: string
    render?: (item: T) => React.ReactNode
    className?: string
  }[]
  data: T[]
  isLoading?: boolean
  emptyState?: React.ReactNode
  onRowClick?: (item: T) => void
}

export function DataGrid<T extends { id: string | number }>({ 
  columns, 
  data, 
  isLoading, 
  emptyState,
  onRowClick 
}: DataGridProps<T>) {
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className="py-12 flex justify-center items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
        {emptyState}
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={cn(
                    "px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((item, i) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => (
                  <td key={`${item.id}-${col.key}`} className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer (Placeholder) */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 flex items-center justify-between text-sm text-slate-500">
        <p>Showing {data.length} results</p>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
