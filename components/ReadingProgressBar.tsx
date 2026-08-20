'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setCompletion(Math.min(100, Math.max(0, (currentProgress / scrollHeight) * 100)))
      } else {
        setCompletion(0)
      }
    }

    updateScrollCompletion()
    window.addEventListener('scroll', updateScrollCompletion, { passive: true })
    window.addEventListener('resize', updateScrollCompletion, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion)
      window.removeEventListener('resize', updateScrollCompletion)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-gray-200/40 z-[60] pointer-events-none">
      <div
        className="h-full bg-[var(--brand-red)] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(179,43,43,0.6)]"
        style={{ width: `${completion}%` }}
        role="progressbar"
        aria-valuenow={Math.round(completion)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
