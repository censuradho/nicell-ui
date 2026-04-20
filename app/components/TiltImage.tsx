'use client'

import { useRef } from 'react'
import Image from 'next/image'

const MAX_TILT = 12
const PERSPECTIVE = 800

export function TiltImage() {
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = containerRef.current
    if (!el) return

    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    el.style.transform = `perspective(${PERSPECTIVE}px) rotateY(${x * MAX_TILT * 2}deg) rotateX(${-y * MAX_TILT}deg) scale3d(1.02, 1.02, 1.02)`
  }

  function handleMouseLeave() {
    const el = containerRef.current
    if (!el) return
    el.style.transform = `perspective(${PERSPECTIVE}px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[300px] w-full rounded-2xl overflow-hidden will-change-transform transition-transform duration-200 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Image
        src="/above-hero.jpg"
        alt="Above the fold image"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}
