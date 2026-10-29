---
name: lenis
description: Implement buttery, inertia-based smooth scrolling and scroll animation synchronization across WebGL and DOM using Lenis (lenis). Use when the user asks for smooth scrolling, inertia scroll physics, syncing scroll state with Three.js and GSAP, or handling page scroll anchors.
---

# Lenis Smooth Scroll Master Guide

Lenis (by Darkroom Engineering) is the modern, lightweight standard for momentum and inertia scrolling on the web. Unlike legacy scroll hijackers that broke keyboard accessibility and native browser events, Lenis normalizes scroll deltas across macOS, Windows, Linux, touchpads, and mouse wheels while preserving native browser semantics.

---

## 1. Core Architecture & Mental Model

```
User Wheel / Touchpad Event
           │
           ▼
 ┌──────────────────────┐
 │    Lenis Normalizer  │ ── Clamps deltas, computes exponential decay easing
 └─────────┬────────────┘
           │
     ┌─────┴─────────────────────────┐
     ▼                               ▼
 ┌──────────────────────┐    ┌──────────────────────┐
 │ Native Window Scroll │    │ GSAP ScrollTrigger   │
 │ window.scrollTo()    │    │ ScrollTrigger.update │
 └──────────────────────┘    └──────────────────────┘
```

### Essential Rules:
1. **Never run two separate RAF loops**: Hook Lenis directly into GSAP's ticker, or run your Three.js render loop inside the same RAF callback.
2. **Disable GSAP `lagSmoothing`**: If GSAP's ticker detects a frame drop and attempts to smooth lag, it will stutter Lenis physics. Always call `gsap.ticker.lagSmoothing(0)`.
3. **Modal & Drawer Lock**: When displaying full-screen navigation or modals, lock scrolling with `lenis.stop()`, and restore it with `lenis.start()`.

---

## 2. Standard React / Next.js Setup with `lenis/react`

```tsx
import React, { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollLayout({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      autoRaf={false} // Managed by GSAP ticker for 100% sync
      root
      options={{
        lerp: 0.08,           // Damping factor (0.05 to 0.1 is golden)
        duration: 1.2,        // Scroll duration in seconds
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

---

## 3. Vanilla JS / Single-File HTML Integration

For standalone creative prototypes:

```html
<script type="module">
  import Lenis from 'https://unpkg.com/lenis@1.1.0/dist/lenis.mjs'

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true
  })

  // Synchronize with requestAnimationFrame
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      lenis.scrollTo(this.getAttribute('href'), {
        offset: -40,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    })
  })
</script>
```

---

## 4. Local Reference
Cloned source code, packages, and playground:
[Lenis Repository Source](file:///C:/Users/tanis/.gemini/web-skills/lenis/repo)
