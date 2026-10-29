---
name: drei
description: Implement advanced 3D building blocks, glass-like refraction materials, 3D typography, environment lighting, model loaders, camera controls, and soft shadows in React Three Fiber using @react-three/drei. Use when creating glass/metallic materials, 3D text, HDRI lighting, contact shadows, or loading 3D assets.
---

# Drei — Advanced 3D Building Blocks Master Guide

`@react-three/drei` is the companion library for React Three Fiber. It gives developers battle-tested components, materials, shaders, controls, and loaders so you never have to re-invent complex 3D math or shader passes from scratch.

---

## 1. Top High-End Drei Components for Awwwards Aesthetics

| Component | Purpose | Key Props |
| :--- | :--- | :--- |
| `<MeshTransmissionMaterial />` | Photorealistic frosted glass with refraction & chromatic dispersion | `transmission={1}`, `thickness={0.5}`, `roughness={0.1}`, `chromaticAberration={0.06}`, `distortion={0.2}` |
| `<Float />` | Organic, natural floating and bobbing physics | `speed={2}`, `rotationIntensity={1.5}`, `floatIntensity={2}` |
| `<Environment />` | Studio and outdoor HDRI lighting maps | `preset="city"`, `background={false}`, `blur={0.8}` |
| `<ContactShadows />` | Soft, ground-contact ambient occlusion shadows | `opacity={0.6}`, `scale={10}`, `blur={1.5}`, `far={4}` |
| `<Text />` & `<Text3D />` | Sharp, responsive 3D typography | `font="..."`, `fontSize={0.8}`, `letterSpacing={-0.05}` |
| `<useGLTF />` | Preloading and instantiating compressed 3D models | `useGLTF.preload('/model.glb')` |
| `<CameraControls />` | Production-grade camera transitions and lerping | Smooth pan, tilt, zoom with physics damping |

---

## 2. Iconic Frosted Glass & Refraction Material Recipe

This creates the signature luxury glass aesthetic seen in high-end product sites (Apple, Teenage Engineering, Lusion):

```tsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment, ContactShadows } from '@react-three/drei'

export function FrostedGlassSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh castShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.98}
          roughness={0.08}
          thickness={0.6}
          ior={1.45}
          chromaticAberration={0.05}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

export function GlassScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
      <Environment preset="city" />
      <FrostedGlassSphere />
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.5}
        scale={6}
        blur={2}
        far={3}
      />
    </Canvas>
  )
}
```

---

## 3. 3D Kinetic Typography (`Text` & `Text3D`)

For sharp, screen-space 3D text that renders fast via signed distance fields (SDF):

```tsx
import { Text } from '@react-three/drei'

function HeroHeadline() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={1.2}
      font="/fonts/Syne-Bold.woff"
      letterSpacing={-0.04}
      color="#f8fafc"
      anchorX="center"
      anchorY="middle"
    >
      CREATIVE UNIVERSE
      <meshStandardMaterial metalness={0.8} roughness={0.2} />
    </Text>
  )
}
```

---

## 4. Optimized Model Loading with `useGLTF`

Always preload models to prevent jarring pops or stutters during render:

```tsx
import { useGLTF } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.5} />
}

// Global Preload
useGLTF.preload('/assets/models/artifact.glb')
```

---

## 5. Local Reference
Cloned source code, sandboxes, and documentation:
[Drei Repository Source](file:///C:/Users/tanis/.gemini/web-skills/drei/repo)
