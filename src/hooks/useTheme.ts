import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const cache = (localStorage.getItem('theme') as Theme) || 'light'
    setTheme(cache)
    document.documentElement.setAttribute('data-theme', cache)
  }, [])

  const toggleTheme = useCallback((newTheme) => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
