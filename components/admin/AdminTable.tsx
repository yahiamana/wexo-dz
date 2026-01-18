'use client'

import { cn } from '@/lib/utils'

interface AdminTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function AdminTable({ children, className, ...props }: AdminTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className={cn("w-full text-left text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  )
}

export function AdminTableHeader({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-medium", className)} {...props}>
      {children}
    </thead>
  )
}

export function AdminTableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-gray-200 dark:divide-slate-800", className)} {...props}>
      {children}
    </tbody>
  )
}

export function AdminTableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors", className)} {...props}>
      {children}
    </tr>
  )
}
// Wait, TableRow should wrap children in tr, not tbody end tag. 
// Actually I'll fix the closing tag in the file content directly.

export function AdminTableHead({ children, className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("px-6 py-4 font-semibold whitespace-nowrap", className)} {...props}>
      {children}
    </th>
  )
}

export function AdminTableCell({ children, className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-6 py-4 align-middle", className)} {...props}>
      {children}
    </td>
  )
}
