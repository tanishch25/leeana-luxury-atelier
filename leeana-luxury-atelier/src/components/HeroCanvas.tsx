import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface HeroCanvasProps {
  scrollProgress?: number
}

export const HeroCanvas: React.FC<HeroCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x040406, 0.08)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 5.5)

    // 2. WebGL Renderer with ACESFilmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.outputColorSpace = THREE.SRGBColorSpace

    container.appendChild(renderer.domElement)

    // 3. Central Haute Joaillerie Crystal Gem
    const gemGeometry = new THREE.OctahedronGeometry(1.3, 0)
    
    // High-end transmission glass material (Three.js r166+ dispersion)
    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.06,
      ior: 1.54,
      thickness: 1.4,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xfff6ea),
      dispersion: 1.25, // Chromatic fire
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    })

    const gemMesh = new THREE.Mesh(gemGeometry, gemMaterial)
    scene.add(gemMesh)

    // 4. Floating Concentric Bronze Orbital Ring
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.015, 16, 100)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x3d2c18,
      emissiveIntensity: 0.2,
    })
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh1.rotation.x = Math.PI * 0.35
    scene.add(ringMesh1)

    const ringGeometry2 = new THREE.TorusGeometry(2.4, 0.01, 16, 100)
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial)
    ringMesh2.rotation.y = Math.PI * 0.4
    scene.add(ringMesh2)

    // 5. Stardust Ambient Particle Field
    const particleCount = 280
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12
      particlePos[i + 1] = (Math.random() - 0.5) * 12
      particlePos[i + 2] = (Math.random() - 0.5) * 10
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // 6. Luxury 3-Point Lighting Architecture
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Key Light (Warm Champagne)
    const keyLight = new THREE.DirectionalLight(0xffecd2, 3.2)
    keyLight.position.set(4, 5, 4)
    scene.add(keyLight)

    // Back Rim Light (Cool Platinum)
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 2.5)
    rimLight.position.set(-4, -3, -4)
    scene.add(rimLight)

    // Accent Gold Spot
    const goldSpot = new THREE.PointLight(0xc5a880, 4, 10)
    goldSpot.position.set(0, -2, 2)
    scene.add(goldSpot)

    // 7. Smooth Pointer Lerping & Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handlePointerMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handlePointerMove)

    // 8. Animation & RAF Loop with Damping
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Damping factor (0.06 - 0.08)
      mouseX += (targetX - mouseX) * 0.06
      mouseY += (targetY - mouseY) * 0.06

      // Floating crystal rotations & harmonic physics
      gemMesh.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2 + mouseY * 0.5
      gemMesh.rotation.y += delta * 0.35 + mouseX * 0.02
      gemMesh.position.y = Math.sin(elapsedTime * 0.9) * 0.12

      // Orbital Rings counter-rotations
      ringMesh1.rotation.z += delta * 0.15
      ringMesh1.rotation.x = Math.PI * 0.35 + mouseY * 0.3
      ringMesh2.rotation.y += delta * 0.22
      ringMesh2.rotation.z = Math.PI * 0.4 + mouseX * 0.3

      // Particles slow drift
      particles.rotation.y += delta * 0.02

      // Dynamic light movement
      goldSpot.position.x = Math.sin(elapsedTime * 0.7) * 2
      goldSpot.position.y = Math.cos(elapsedTime * 0.5) * 2

      // Subtle parallax camera sway
      camera.position.x = mouseX * 0.5
      camera.position.y = -mouseY * 0.5
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // 9. Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Clean Unmount Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      // Dispose Three.js objects
      gemGeometry.dispose()
      gemMaterial.dispose()
      ringGeometry.dispose()
      ringGeometry2.dispose()
      ringMaterial.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
