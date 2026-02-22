'use client'
import { useEffect, useRef } from 'react'

export const useRevealOnScroll = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export const revealSx = {
  opacity: 0,
  transform: 'translateY(32px)',
  transition: 'opacity 0.7s ease, transform 0.7s ease',
  '&.revealed': {
    opacity: 1,
    transform: 'translateY(0)',
  },
} as const
