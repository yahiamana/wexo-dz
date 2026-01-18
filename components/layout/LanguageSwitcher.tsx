import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, ChevronDown } from 'lucide-react'
import { type Locale, locales, localeNames } from '@/lib/i18n'
import { FlagUK, FlagFR, FlagDZ } from '@/components/ui/Flags'

interface LanguageSwitcherProps {
  currentLocale: Locale
}

const FlagComponent = ({ locale, className }: { locale: Locale, className?: string }) => {
  switch (locale) {
    case 'en': return <FlagUK className={className} />
    case 'fr': return <FlagFR className={className} />
    case 'ar': return <FlagDZ className={className} />
    default: return null
  }
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from path and add new one
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    
    // Store preference
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`
    
    router.push(newPath)
    setIsOpen(false)
  }
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400 hidden sm:block" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm">
            <FlagComponent locale={currentLocale} className="w-full h-full object-cover" />
          </span>
          <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-32 sm:w-40 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 z-[60]">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full px-4 py-3 sm:py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                locale === currentLocale ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm shrink-0">
                  <FlagComponent locale={locale} className="w-full h-full object-cover" />
              </span>
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <span className="sm:hidden uppercase">{locale}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
