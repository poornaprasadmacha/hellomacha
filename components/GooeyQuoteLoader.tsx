'use client'

import React, { useState, useEffect } from 'react'

interface QuoteItem {
  text: string
  author: string | null
  isTip: boolean
}

const quotes: QuoteItem[] = [
  {
    text: `"Do not save what is left after spending, but spend what is left after saving."`,
    author: "Warren Buffett",
    isTip: false,
  },
  {
    text: "Track every single rupee. Discipline is the bridge between goals and wealth.",
    author: null,
    isTip: true,
  },
  {
    text: `"Wealth consists not in having great possessions, but in having few wants."`,
    author: "Epictetus",
    isTip: false,
  },
  {
    text: "Automate your investments. Let time and compound interest do the heavy lifting.",
    author: null,
    isTip: true,
  },
  {
    text: `"An investment in knowledge pays the best interest."`,
    author: "Benjamin Franklin",
    isTip: false,
  },
  {
    text: "Build a 6-month emergency fund before taking high risks.",
    author: null,
    isTip: true,
  },
  {
    text: `"The habit of saving is itself an education; it fosters every virtue."`,
    author: "T.T. Munger",
    isTip: false,
  },
  {
    text: "Delaying gratification today guarantees financial freedom tomorrow.",
    author: null,
    isTip: true,
  },
]

export default function GooeyQuoteLoader() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeState, setFadeState] = useState<'normal' | 'fade-out' | 'fade-in-prep'>('normal')

  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Trigger slide-up fade out
      setFadeState('fade-out')

      setTimeout(() => {
        // 2. Advance to next quote
        setCurrentIndex((prev) => (prev + 1) % quotes.length)
        // 3. Set to prep state (positioned below, invisible)
        setFadeState('fade-in-prep')

        // 4. Slide up smoothly into position
        setTimeout(() => {
          setFadeState('normal')
        }, 50)
      }, 600)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const currentQuote = quotes[currentIndex]

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] py-12 px-4 text-center select-none w-full">
      {/* Inline SVG Filter definition for liquid gooey effect */}
      <svg width="0" height="0" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <filter id="gooey-filter-unique">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 20 -9"
            result="gooey"
          />
          <feBlend in="SourceGraphic" in2="gooey" />
        </filter>
      </svg>

      <style dangerouslySetInnerHTML={{ __html: `
        .gooey-loader-wrapper {
          width: 140px;
          height: 140px;
          position: relative;
          margin-bottom: 32px;
          filter: url(#gooey-filter-unique);
        }

        .gooey-loader-wrapper .core-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 45px;
          height: 45px;
          background: #b32b2b;
          border-radius: 50% !important;
          animation: gooey-pulse-core 3s ease-in-out infinite alternate;
        }

        .gooey-loader-wrapper .droplet-node {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 25px;
          height: 25px;
          background: #e63946;
          border-radius: 50% !important;
          margin-top: -12.5px;
          margin-left: -12.5px;
        }

        .gooey-loader-wrapper .droplet-node:nth-child(2) {
          animation: gooey-orbit 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .gooey-loader-wrapper .droplet-node:nth-child(3) {
          animation: gooey-orbit 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite 1s;
        }
        .gooey-loader-wrapper .droplet-node:nth-child(4) {
          animation: gooey-orbit 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite 2s;
        }

        @keyframes gooey-orbit {
          0% {
            transform: rotate(0deg) translateX(0px) scale(0.5);
          }
          50% {
            transform: rotate(180deg) translateX(55px) scale(1.1);
          }
          100% {
            transform: rotate(360deg) translateX(0px) scale(0.5);
          }
        }

        @keyframes gooey-pulse-core {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .loader-quote-container {
          position: relative;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 620px;
          padding: 0 24px;
        }

        .loader-quote-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--ink, #1b1b1b);
          line-height: 1.6;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .loader-quote-text.normal {
          opacity: 1;
          transform: translateY(0);
        }

        .loader-quote-text.fade-out {
          opacity: 0;
          transform: translateY(-15px);
        }

        .loader-quote-text.fade-in-prep {
          opacity: 0;
          transform: translateY(15px);
          transition: none;
        }
      ` }} />

      {/* Gooey Animation Container */}
      <div className="gooey-loader-wrapper" aria-label="Loading animation">
        <div className="core-node" />
        <div className="droplet-node" />
        <div className="droplet-node" />
        <div className="droplet-node" />
      </div>

      {/* Quote Display Container */}
      <div className="loader-quote-container">
        <div className={`loader-quote-text ${fadeState}`}>
          {currentQuote.isTip ? (
            <span>
              <strong className="text-[#b32b2b] font-semibold mr-1.5">Pro Tip:</strong>
              {currentQuote.text}
            </span>
          ) : (
            <span>
              {currentQuote.text}
              {currentQuote.author && (
                <>
                  <br />
                  <em className="text-sm text-[var(--muted,#707070)] font-normal mt-1.5 block">
                    – {currentQuote.author}
                  </em>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
