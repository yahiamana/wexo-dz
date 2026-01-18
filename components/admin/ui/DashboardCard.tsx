import { cn } from '@/lib/utils'

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  noPadding?: boolean
}

export function DashboardCard({ children, className, noPadding = false, ...props }: DashboardCardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200",
        !noPadding && "p-6 sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface DashboardCardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function DashboardCardHeader({ title, subtitle, action, className }: DashboardCardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)}>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-lg tracking-tight">{title}</h3>
        {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
