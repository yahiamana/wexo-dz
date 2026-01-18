import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react'
import { DashboardCard } from './DashboardCard'
import { cn } from '@/lib/utils'

interface StatWidgetProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  color?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple'
}

const colorStyles = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
}

export function StatWidget({ label, value, icon: Icon, trend, color = 'indigo' }: StatWidgetProps) {
  return (
    <DashboardCard className="relative overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h4 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h4>
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-semibold",
              trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}>
              {trend.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={cn("p-3 rounded-xl transition-colors", colorStyles[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-[0.03] dark:opacity-[0.05] rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
    </DashboardCard>
  )
}
