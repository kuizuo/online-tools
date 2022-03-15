import { useState, useEffect, useCallback } from 'react'
import { Extension } from '@codemirror/state'

type Theme = 'light' | 'dark' | Extension

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'light')
  }, [])

  const toggleTheme = useCallback((newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
