'use client'

import { useState, useRef } from 'react'

const messages = [
  'Are you sure about that? 🤨',
  'The universe says try again ✨',
  'Interesting choice... 💭',
  'Bold strategy 😏',
  'Okay, being difficult I see 💅',
  'We can do this all day 😤',
  'The audacity 😑',
  'I\'m not mad, just disappointed 🙃',
  'That button is getting TINY 😒',
  'Good luck finding it 👀',
]

const reactions = ['🤨', '😌', '💅', '😑', '💅', '😤', '😒', '🙃', '💢', '🙅']

export default function ValentinePage() {
  const [clickCount, setClickCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [noScale, setNoScale] = useState(1)
  const [yesScale, setYesScale] = useState(1)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const handleNoClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    const newNoScale = Math.max(0.08, 1 - newCount * 0.22)
    const newYesScale = Math.min(2.5, 1 + newCount * 0.4)

    setNoScale(newNoScale)
    setYesScale(newYesScale)

    if (newCount > 8) {
      // After 8 clicks, button jumps around the screen
      const randomX = Math.random() * 400 - 200
      const randomY = Math.random() * 400 - 200
      setNoPosition({ x: randomX, y: randomY })
      if (noButtonRef.current) {
        noButtonRef.current.style.transform = `translateX(${randomX}px) translateY(${randomY}px) scale(${newNoScale})`
      }
    } else if (newCount > 2 && noButtonRef.current) {
      // Clicks 3-8: button moves locally
      const randomX = Math.random() * 180 - 90
      const randomY = Math.random() * 180 - 90
      noButtonRef.current.style.transform = `translateX(${randomX}px) translateY(${randomY}px) scale(${newNoScale})`
    } else if (noButtonRef.current) {
      // Clicks 1-2: just shrink
      noButtonRef.current.style.transform = `scale(${newNoScale})`
    }
  }

  const handleYesClick = () => {
    setAccepted(true)
  }

  const currentMessage = messages[Math.min(clickCount - 1, messages.length - 1)]
  const currentReaction = reactions[Math.min(clickCount - 1, reactions.length - 1)]

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 flex items-center justify-center p-6 md:p-8 overflow-hidden">
      {/* Subtle floating sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 text-2xl opacity-15"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          ✨
        </div>
        <div
          className="absolute top-3/4 right-1/4 text-2xl opacity-15"
          style={{
            animation: 'float 8s ease-in-out infinite 1s',
          }}
        >
          ✨
        </div>
        <div
          className="absolute top-1/2 right-1/3 text-2xl opacity-10"
          style={{
            animation: 'float 7s ease-in-out infinite 2s',
          }}
        >
          ✨
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      <div className="relative z-10 max-w-2xl w-full">
        {!accepted ? (
          <div className="text-center space-y-12">
            {/* Elegant Header */}
            <div className="space-y-6">
              <h1
                className="text-5xl md:text-7xl font-bold text-rose-800 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Will you be my valentine?
              </h1>
              <p className="text-4xl">💕</p>
            </div>

            {/* Sophisticated message */}
            {clickCount > 0 && (
              <div className="space-y-3 animate-in fade-in">
                <p className="text-lg md:text-xl text-rose-700 font-light tracking-wide">
                  {currentMessage}
                </p>
                <p className="text-5xl">{currentReaction}</p>
              </div>
            )}

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center relative min-h-20">
              {/* Yes Button - grows with gradient */}
              <button
                onClick={handleYesClick}
                className="relative px-10 md:px-14 py-3 md:py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-light text-lg md:text-xl rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:from-rose-600 hover:to-rose-700 whitespace-nowrap backdrop-blur-sm"
                style={{
                  transform: `scale(${yesScale})`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                Yes
              </button>

              {/* No Button - shrinks with outline style */}
              <button
                ref={noButtonRef}
                onClick={handleNoClick}
                className="relative px-10 md:px-14 py-3 md:py-4 bg-white text-rose-600 font-light text-lg md:text-xl rounded-lg border-2 border-rose-300 shadow-md hover:shadow-lg hover:border-rose-400 transition-all duration-300 whitespace-nowrap"
                style={{
                  transform: `scale(${noScale})`,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                No
              </button>
            </div>

            {/* Subtle footer */}
            {clickCount === 0 && (
              <p className="text-sm md:text-base text-rose-700 font-light opacity-75">
                Choose wisely
              </p>
            )}
          </div>
        ) : (
          // Elegant Celebration
          <div className="text-center space-y-8 animate-in fade-in zoom-in-50">
            <div
              className="text-6xl md:text-8xl"
              style={{
                animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              ✨
            </div>

            <div className="space-y-6">
              <h2
                className="text-5xl md:text-7xl font-light text-rose-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                See you on 14th Feb babe 💕
              </h2>
              <div className="flex justify-center gap-2 text-3xl">
                <span>✨</span>
                <span>💕</span>
                <span>✨</span>
              </div>
            </div>

            <button
              onClick={() => {
                setAccepted(false)
                setClickCount(0)
                setNoScale(1)
                setYesScale(1)
                setNoPosition({ x: 0, y: 0 })
              }}
              className="mt-8 px-8 py-2 text-rose-600 border-2 border-rose-300 rounded-lg hover:border-rose-500 hover:bg-rose-50 transition-all font-light text-sm md:text-base"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
