---
name: react-three-fiber
description: Build declarative, high-performance 3D scenes and WebGL canvas components inside React applications using React Three Fiber (@react-three/fiber). Use when the user asks to build 3D web apps, interactive 3D hero sections, React Three.js integrations, procedural meshes, particle systems, or canvas viewports inside React.
---

# React Three Fiber (R3F) Master Blueprint

React Three Fiber (`@react-three/fiber`) brings Three.js into the declarative React component lifecycle. It is not an abstraction layer that wraps Three.js in proprietary code; every Three.js class corresponds directly to a camelCased JSX element (e.g., `THREE.Mesh` becomes `<mesh>`, `THREE.BoxGeometry` becomes `<boxGeometry>`).

---

## 1. Core Architecture & Mental Model

```
React Component Tree
       │
       ▼
 ┌───────────────┐
 │   <Canvas>    │ ─── Renders into WebGL Context, sets up Scene, Camera, RAF loop
 └───────┬───────┘
         │
    ┌────┴───────────────────────────┐
    ▼                                ▼
┌─────────────────┐          ┌─────────────────┐
│ Lighting & Env  │          │   3D Objects    │
│ <ambientLight>  │          │  <mesh ref={...}>
│ <directional..> │          │   <boxGeometry> │
└─────────────────┘          │   <meshStandard>│
                             └────────┬────────┘
                                      │
                                      ▼
                             useFrame((state, delta) => {
                               // Direct 60fps mutation without re-renders
                               meshRef.current.rotation.y += delta * 0.5
                             })
```

### Essential Rules:
1. **Never trigger React state changes on every frame (`useFrame`)**: Doing `setCount()` or triggering re-renders inside `useFrame` destroys performance. Mutate refs directly (`meshRef.current.position.x += delta`).
2. **Cap DPR for mobile & high-res screens**: Always set `dpr={[1, 2]}` on `<Canvas>`. A 3x or 4x Retina display will burn the GPU without visible gain.
3. **Memoize Geometries and Materials**: Don't construct new `THREE.BufferGeometry` or `THREE.ShaderMaterial` on each render. Use `useMemo` or declare them outside the component.
4. **Clean Disposal**: Use `dispose={null}` when caching assets across route transitions, or allow R3F to automatically dispose unmounted objects.

---

## 2. Standard Production Canvas Boilerplate

```tsx
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingMeshProps {
  color?: string
}

function FloatingMesh({ color = '#3b82f6' }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    // Smooth harmonic floating motion
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    meshRef.current.rotation.y += delta * 0.4
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.85}
      />
    </mesh>
  )
}

export function SceneCanvas() {
  return (
    <div className="relative w-full h-screen bg-[#07070a]">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <FloatingMesh />
      </Canvas>
    </div>
  )
}
```

---

## 3. High-Performance Hooks & Lifecycle

* **`useFrame((state, delta) => { ... })`**:
  Executes before each render. Delta is time in seconds since the previous frame. State contains `state.clock`, `state.camera`, `state.scene`, `state.mouse` (normalized `-1` to `+1`), and `state.viewport`.
* **`useThree()`**:
  Access scene internals: `const { gl, camera, scene, size, viewport } = useThree()`.
* **Frameloop Optimization**:
  - `frameloop="always"`: Default for continuous 3D interactive experiences.
  - `frameloop="demand"`: Ideal for portfolio or tool sites where the scene only needs re-rendering on prop change or pointer move (`invalidate()` triggers a frame).

---

## 4. Pointer Interaction & Raycasting

R3F provides built-in pointer events on meshes:

```tsx
<mesh
  onClick={(e) => {
    e.stopPropagation()
    console.log('Clicked point:', e.point)
  }}
  onPointerOver={(e) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
  }}
  onPointerOut={() => {
    document.body.style.cursor = 'auto'
  }}
>
```

---

## 5. Local Reference
Cloned source code, examples, and packages:
[R3F Repository Source](file:///C:/Users/tanis/.gemini/web-skills/react-three-fiber/repo)
