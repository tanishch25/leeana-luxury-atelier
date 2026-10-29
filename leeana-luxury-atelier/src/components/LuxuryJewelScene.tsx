import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export const LuxuryJewelScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    )
    camera.position.set(0, 0.2, 5.2)

    // 2. High-Performance ACES Filmic Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    renderer.outputColorSpace = THREE.SRGBColorSpace

    container.appendChild(renderer.domElement)

    // 3. Studio HDRI / Neutral Room Environment via PMREM
    // This provides the rich specular environment reflections that real diamonds require
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()
    const roomEnv = new RoomEnvironment()
    const neutralEnv = pmremGenerator.fromScene(roomEnv, 0.04).texture
    scene.environment = neutralEnv

    // 4. Bespoke Haute Joaillerie Brilliant-Cut Diamond Geometry
    function createBrilliantCutGeometry(segments = 16) {
      const geom = new THREE.BufferGeometry()
      const tableRadius = 0.82
      const tableHeight = 0.58
      const girdleRadius = 1.48
      const girdleHeight = 0.08
      const culetHeight = -1.25

      const positions: number[] = []

      // Center of table
      const topCenter = [0, tableHeight, 0]

      // Table perimeter
      const tableRim: [number, number, number][] = []
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        tableRim.push([
          Math.cos(angle) * tableRadius,
          tableHeight,
          Math.sin(angle) * tableRadius,
        ])
      }

      // Staggered girdle ring for triangular facet cuts
      const girdle: [number, number, number][] = []
      for (let i = 0; i < segments; i++) {
        const angle = ((i + 0.5) / segments) * Math.PI * 2
        girdle.push([
          Math.cos(angle) * girdleRadius,
          girdleHeight,
          Math.sin(angle) * girdleRadius,
        ])
      }
      const culet = [0, culetHeight, 0]

      // A. Table octagonal / polygonal fan facets
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments
        positions.push(...topCenter, ...tableRim[i], ...tableRim[next])
      }

      // B. Crown triangular facets
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments
        // Upper triangle
        positions.push(...tableRim[i], ...girdle[i], ...tableRim[next])
        // Lower triangle
        positions.push(...girdle[i], ...girdle[next], ...tableRim[next])
      }

      // C. Pavilion facets tapering down to culet
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments
        positions.push(...girdle[next], ...girdle[i], ...culet)
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geom.computeVertexNormals()
      return geom
    }

    const diamondGeometry = createBrilliantCutGeometry(18)

    // Diamond Physical Glass with High Refraction & Dispersion
    const diamondMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.04,
      roughness: 0.0,
      ior: 2.417,                 // Exact diamond refractive index
      transmission: 0.94,
      thickness: 2.2,
      specularIntensity: 2.0,
      specularColor: new THREE.Color(0xfff5ea),
      dispersion: 0.12,           // Chromatic dispersion fire
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color(0xfcf8f2),
      attenuationDistance: 3.0,
      transparent: true,
      opacity: 1.0,
    })

    const diamondMesh = new THREE.Mesh(diamondGeometry, diamondMaterial)
    scene.add(diamondMesh)

    // Delicate Champagne Gold Orbital Rings
    const ringGroup = new THREE.Group()

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,            // Fine yellow/champagne gold
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x3d2c14,
      emissiveIntensity: 0.15,
    })

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.95, 0.009, 16, 120),
      ringMat
    )
    ring1.rotation.x = Math.PI * 0.38
    ringGroup.add(ring1)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.25, 0.006, 16, 120),
      ringMat
    )
    ring2.rotation.x = -Math.PI * 0.28
    ring2.rotation.y = Math.PI * 0.2
    ringGroup.add(ring2)

    scene.add(ringGroup)

    // 5. Studio Key and Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Warm champagne key light
    const keyLight = new THREE.DirectionalLight(0xfff2e0, 4.0)
    keyLight.position.set(5, 6, 4)
    scene.add(keyLight)

    // Soft cool rim backlight
    const rimLight = new THREE.DirectionalLight(0xdbe6ff, 3.5)
    rimLight.position.set(-5, -4, -4)
    scene.add(rimLight)

    // Moving caustic spot
    const causticSpot = new THREE.PointLight(0xf2e0c2, 3.0, 10)
    causticSpot.position.set(0, 3, 3)
    scene.add(causticSpot)

    // 6. Smooth Pointer Tracking with Damping
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', handlePointerMove)

    // 7. Render Loop with Smooth Damped Physics
    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth damping (0.06)
      mouseX += (targetX - mouseX) * 0.06
      mouseY += (targetY - mouseY) * 0.06

      // Harmonic slow rotation
      diamondMesh.rotation.y += delta * 0.22 + mouseX * 0.02
      diamondMesh.rotation.x = Math.sin(time * 0.35) * 0.18 + mouseY * 0.25
      diamondMesh.position.y = Math.sin(time * 0.75) * 0.09

      // Counter-rotating gold orbital rings
      ring1.rotation.z += delta * 0.12
      ring2.rotation.z -= delta * 0.08
      ringGroup.rotation.y = mouseX * 0.15

      // Caustic spot drift
      causticSpot.position.x = Math.sin(time * 0.7) * 2.5
      causticSpot.position.y = Math.cos(time * 0.5) * 2.0

      // Camera parallax
      camera.position.x = mouseX * 0.3
      camera.position.y = 0.2 - mouseY * 0.3
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(reqId)

      diamondGeometry.dispose()
      diamondMaterial.dispose()
      ring1.geometry.dispose()
      ring2.geometry.dispose()
      ringMat.dispose()
      neutralEnv.dispose()
      roomEnv.dispose()
      pmremGenerator.dispose()
      renderer.dispose()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-[480px] md:h-[600px] pointer-events-none select-none relative"
    />
  )
}
