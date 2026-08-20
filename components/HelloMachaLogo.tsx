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
        <span className="font-yapa font-normal tracking-wide leading-none" style={{ color, fontSize: compact ? 20 : 25 }}>
          HelloMacha!
        </span>
      </div>
    )
  }

  // Compact icon + wordmark: show a small square icon then wordmark.
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${compact ? 'h-7 w-7 text-sm' : 'h-8 w-8 text-base'} flex items-center justify-center bg-[var(--brand-red)] text-white font-yapa font-normal`}>
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
