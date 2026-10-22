import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isLight: false,
  toggleTheme: () => {},
})

function readStoredTheme() {
  try {
    const saved = localStorage.getItem('rp-theme')
    if (saved === 'light' || saved === 'dark') return saved
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
    return 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(() => {
    const isLightMode = theme === 'light'
    document.documentElement.classList.toggle('light', isLightMode)
    try {
      localStorage.setItem('rp-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = {
    theme,
    isLight: theme === 'light',
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    // Graceful fallback for components used outside provider
    const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light')
    return {
      theme: isLight ? 'light' : 'dark',
      isLight,
      toggleTheme: () => {},
    }
  }
  return context
}
