import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    document.body.classList.remove('has-custom-cursor')
  }, [])
  return null
}
