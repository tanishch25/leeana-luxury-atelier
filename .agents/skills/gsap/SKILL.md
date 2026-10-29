---
name: gsap
description: Choreograph complex motion, scroll-driven timelines, pinned sections, split-text character reveals, horizontal scroll experiences, and morphing transitions using GSAP and ScrollTrigger. Use when the user asks for scroll animations, pinned content, staggered text reveals, timeline choreography, or syncing motion with WebGL.
---

# GSAP (GreenSock Animation Platform) Master Guide

GSAP 3 is the industry standard for high-performance timeline choreography and scroll-linked web motion. It delivers 60fps animations with sub-millisecond precision, bypassing CSS limitations and handling complex sequencing effortlessly.

---

## 1. Core Architecture & React Integration Pattern

In React / Next.js, **always** encapsulate animations in `gsap.context()` to guarantee clean unmounting and prevent memory leaks or duplicate ScrollTrigger instances:

```tsx
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const titleRef = useRef<HTMLHeadingElement>(null!)
  const cardRef = useRef<HTMLDivElement>(null!)

  useLayoutEffect(() => {
    // gsap.context handles scoping and automatic revert on cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1, // Smooth 1-second lag damping
          anticipatePin: 1,
        },
      })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power3.out',
      })
      .to(titleRef.current, {
        scale: 0.85,
        opacity: 0.2,
        duration: 1,
      }, '+=0.5')
      .from(cardRef.current, {
        y: '100%',
        rotateX: 45,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      }, '<0.2')

    }, containerRef)

    return () => ctx.revert() // Critical cleanup
  }, [])

  return (
    <section ref={containerRef} className="h-screen relative flex items-center justify-center bg-black text-white">
      <h1 ref={titleRef} className="text-7xl font-bold tracking-tight">KINETIC EXPERIENCE</h1>
      <div ref={cardRef} className="absolute bottom-12 w-96 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <p>Interactive 3D synchronization card</p>
      </div>
    </section>
  )
}
```

---

## 2. Kinetic Split-Text Character Staggers

Text reveals should never be plain fade-ins. Break text into characters or words and stagger them with exponential deceleration:

```javascript
gsap.from(".char", {
  y: 60,
  rotateX: -90,
  opacity: 0,
  filter: "blur(4px)",
  stagger: {
    amount: 0.6,
    from: "start",
    ease: "power2.inOut"
  },
  duration: 1.2,
  ease: "power4.out"
});
```

---

## 3. Synchronizing GSAP with Three.js & Lenis

When combining GSAP ScrollTrigger with smooth scroll engines (like Lenis), connect the RAF ticker:

```javascript
// Synchronize Lenis and GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// Prevent GSAP lagSmoothing from desyncing smooth scroll physics
gsap.ticker.lagSmoothing(0)
```

---

## 4. Responsive Animations with `gsap.matchMedia()`

Always adjust pinning and complex choreography between mobile and desktop:

```javascript
const mm = gsap.matchMedia()

mm.add("(min-width: 800px)", () => {
  // Desktop: Pinned 3D canvas and horizontal card slider
  gsap.to(".slider-track", {
    xPercent: -200,
    ease: "none",
    scrollTrigger: {
      trigger: ".slider-wrap",
      pin: true,
      scrub: 1,
      end: "+=3000"
    }
  })
})

mm.add("(max-width: 799px)", () => {
  // Mobile: Simple vertical stacked cards without heavy pinning
  gsap.from(".card", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".card",
      start: "top 80%"
    }
  })
})
```

---

## 5. Local Reference
Cloned source code, build dist, and examples:
[GSAP Repository Source](file:///C:/Users/tanis/.gemini/web-skills/gsap/repo)
