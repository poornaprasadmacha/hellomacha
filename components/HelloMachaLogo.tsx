import React from 'react'

type Props = {
  compact?: boolean
  textOnly?: boolean
  invert?: boolean
}

export default function HelloMachaLogo({ compact = false, textOnly = false, invert = false }: Props) {
  const color = invert ? '#ffffff' : 'var(--brand-red)'

  // Text-only logo (font-style wordmark) to match clean editorial look.
  if (textOnly) {
    return (
      <div className="select-none flex items-center">
        <span
          className="font-yapa font-normal tracking-wide leading-none text-xl md:text-2xl"
          style={{ color }}
        >
          HelloMacha!
        </span>
      </div>
    )
  }

  // Compact icon + wordmark: show a small square icon then wordmark.
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${compact ? 'h-6 w-6 text-xs sm:h-7 sm:w-7 sm:text-sm' : 'h-7 w-7 sm:h-8 sm:w-8 text-sm sm:text-base'} flex items-center justify-center bg-[var(--brand-red)] text-white font-yapa font-normal`}>
        H
      </div>
      <div className="flex items-center">
        <span style={{ color }} className="font-yapa font-normal tracking-wide text-xl sm:text-2xl leading-none">
          HelloMacha!
        </span>
      </div>
    </div>
  )
}
