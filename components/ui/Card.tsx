import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
  onClick?: () => void
}

export default function Card({ children, className, hover = false, glass = false, onClick }: CardProps) {
  const Component = onClick ? 'button' : 'div'
  return (
    <Component
      onClick={onClick}
      className={cn(
        'relative rounded-3xl p-8 text-left w-full overflow-hidden transition-all duration-300',
        glass 
          ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 shadow-xl' 
          : 'bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-800',
        hover && 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-xl font-bold text-gray-900 dark:text-white', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-gray-600 dark:text-slate-400', className)}>{children}</p>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('text-slate-600 dark:text-slate-300', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-6 pt-4 border-t border-gray-100 dark:border-slate-800', className)}>{children}</div>
}
