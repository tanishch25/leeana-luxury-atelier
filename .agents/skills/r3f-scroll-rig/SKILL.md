---
name: r3f-scroll-rig
description: Synchronize 3D meshes directly with DOM HTML elements during scrolling using @14islands/r3f-scroll-rig. Use when the user asks to bind 3D objects to HTML divs, create WebGL image distortion on hover/scroll, build smooth scroll 3D parallax, or combine WebGL and HTML elements into one unified viewport.
---

# 14islands R3F Scroll Rig Master Guide

The **R3F Scroll Rig** by 14islands solves the fundamental challenge of creative web development: **connecting HTML/CSS layout with a high-performance WebGL scene**.

Instead of trying to position HTML around a 3D canvas, you write normal, responsive, accessible HTML/CSS, and the Scroll Rig places 3D meshes directly over your HTML elements, tracking their exact screen coordinates and scroll offsets with pixel precision.

---

## 1. Core Architecture & Mental Model

```
 ┌─────────────────────────────────────────────────────────┐
 │ DOM Hierarchy (Normal HTML, SEO, CSS Flex/Grid, Lenis)  │
 │                                                         │
 │   <div ref={domEl} className="w-80 h-96 ...">           │
 │       │                                                 │
 │       ▼                                                 │
 │   <ScrollScene track={domEl}>                           │
 │       │                                                 │
 └───────┼─────────────────────────────────────────────────┘
         │
         │ (Synchronizes screen bounding rect, scroll lerp, visibility)
         │
 ┌───────▼─────────────────────────────────────────────────┐
 │ <GlobalCanvas> (Fixed Fullscreen WebGL Layer)            │
 │                                                         │
 │   (Mesh renders directly at the DOM element's pixels)   │
 │   <mesh>                                                │
 │     <planeGeometry />                                   │
 │     <distortionShaderMaterial />                        │
 │   </mesh>                                               │
 └─────────────────────────────────────────────────────────┘
```

### Key Advantages:
1. **Single WebGL Context**: Only one `<Canvas>` for the entire site. Never create multiple canvas elements per page or per card (which crashes mobile GPUs).
2. **True Responsive Layout**: Let CSS Grid and Flexbox handle mobile breakpoints, margins, and reflow. The 3D meshes follow automatically.
3. **Frustum Culling by Visibility**: Meshes outside the current scroll viewport are automatically not rendered, keeping framerates locked at 60fps.

---

## 2. Standard Production Implementation Pattern

```tsx
import React, { useRef } from 'react'
import { GlobalCanvas, ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig'
import * as THREE from 'three'

interface ProductCard3DProps {
  imageSrc: string
  title: string
}

function ImageMesh({ scale, scrollState }: any) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  // scrollState provides: inViewport, progress, visibility, etc.
  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial color="#ffffff" wireframe={false} />
    </mesh>
  )
}

export function ProductCard({ imageSrc, title }: ProductCard3DProps) {
  const elRef = useRef<HTMLDivElement>(null!)

  return (
    <div className="relative group">
      {/* 1. Normal DOM Element defines size and spacing */}
      <div
        ref={elRef}
        className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900"
      >
        {/* 2. R3F ScrollScene tracks this DOM element */}
        <UseCanvas>
          <ScrollScene track={elRef}>
            {(props) => <ImageMesh {...props} />}
          </ScrollScene>
        </UseCanvas>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
    </div>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Fixed global canvas rendered behind/above DOM content */}
      <GlobalCanvas
        style={{ pointerEvents: 'none' }}
        scaleMultiplier={0.01}
        globalRender={true}
      />
      <main className="relative z-10">{children}</main>
    </div>
  )
}
```

---

## 3. Shader Distortions on Scroll & Mouse Proximity

Because the mesh matches the element dimensions, pass normalized scroll velocity into custom fragment shaders:

```glsl
// Fragment shader distortion mapped to scroll momentum
uniform float uScrollVelocity;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  // Dynamic wave displacement based on scroll speed
  uv.y += sin(uv.x * 10.0) * (uScrollVelocity * 0.02);
  vec4 textureColor = texture2D(uTexture, uv);
  gl_FragColor = textureColor;
}
```

---

## 4. Local Reference
Cloned source code, powerups, and examples:
[R3F Scroll Rig Repository Source](file:///C:/Users/tanis/.gemini/web-skills/r3f-scroll-rig/repo)
