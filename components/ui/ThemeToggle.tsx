'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import Button from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
      setMounted(true)
  }, [])

  if (!mounted) {
      return (
         <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full px-0">
            <span className="sr-only">Toggle theme</span>
         </Button>
      )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-10 h-10 rounded-full px-0 relative overflow-hidden text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
        <motion.div
            initial={false}
            animate={{
                scale: theme === 'dark' ? 0 : 1,
                rotate: theme === 'dark' ? 90 : 0,
                opacity: theme === 'dark' ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
        >
            <Sun className="h-5 w-5" />
        </motion.div>
        
        <motion.div
            initial={false}
            animate={{
                scale: theme === 'dark' ? 1 : 0,
                rotate: theme === 'dark' ? 0 : -90,
                opacity: theme === 'dark' ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
        >
             <Moon className="h-5 w-5" />
        </motion.div>
        
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
