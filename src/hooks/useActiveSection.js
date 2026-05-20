import { useEffect, useState } from 'react'

const sections = ['home', 'about', 'skills', 'projects', 'github', 'contact']

export function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const els = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return active
}
