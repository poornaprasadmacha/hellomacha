import React from 'react'

type Props = {
  compact?: boolean
  textOnly?: boolean
  invert?: boolean
}

export default function HelloMachaLogo({ compact = false, textOnly = false, invert = false }: Props) {
  const color = invert ? '#ffffff' : 'var(--brand-red)'

  // Text-only logo (font-style wordmark) to match Quora-like look.
  if (textOnly) {
    return (
      <div className="select-none">
        <span className="font-serif font-bold" style={{ color, fontSize: compact ? 18 : 22 }}>
          HelloMacha
        </span>
      </div>
    )
  }

  // Compact icon + wordmark: show a small square icon then wordmark.
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`${compact ? 'h-8 w-8' : 'h-9 w-9'} flex items-center justify-center bg-[var(--brand-red)] text-white`}>
        <span className="font-bold">H</span>
      </div>
      <div className="font-serif">
        <span style={{ color }} className="text-xl font-bold sm:text-2xl">
          HelloMacha
        </span>
      </div>
    </div>
  )
}
