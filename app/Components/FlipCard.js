"use client"

import { useEffect, useState } from "react"



export function FlipCard({ digit }) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [prevDigit, setPrevDigit] = useState(digit)

  useEffect(() => {
    if (prevDigit !== digit) {
      setIsFlipping(true)
      const timer = setTimeout(() => {
        setIsFlipping(false)
        setPrevDigit(digit)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [digit, prevDigit])

  return (
    <div className="relative px-2 lg:px-4 h-10 bg-red-600 rounded-md shadow-lg overflow-hidden">
      <div
        className={` inset-0 flex items-center justify-center text-4xl font-bold text-white ${
          isFlipping ? "animate-flip-top" : ""
        }`}
      >
        {digit}
      </div>
      <div className="absolute inset-x-0 top-[45%] h-[2px] bg-red-800/20" />
      <div className="absolute inset-x-0 top-[45%] h-[2px] bg-white/10" />
    </div>
  )
}

