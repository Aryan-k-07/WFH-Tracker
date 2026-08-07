import { useState, useEffect } from 'react'

// Persists a piece of state to the browser's localStorage under `key`.
// Data never leaves the browser -- nothing is sent anywhere, no login needed.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (e) {
      console.warn(`Could not read localStorage key "${key}"`, e)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn(`Could not write localStorage key "${key}"`, e)
    }
  }, [key, value])

  return [value, setValue]
}
