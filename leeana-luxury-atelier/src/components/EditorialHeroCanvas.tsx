import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface EditorialHeroCanvasProps {
  currentImage: string
}

export const EditorialHeroCanvas: React.FC<EditorialHeroCanvasProps> = ({ currentImage }) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const textureRef = useRef<THREE.Texture | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene, Orthographic Camera for perfect 2D WebGL plane
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // 2. High-performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. Texture loader
    const textureLoader = new THREE.TextureLoader()
    const tex = textureLoader.load(currentImage)
    tex.colorSpace = THREE.SRGBColorSpace
    textureRef.current = tex

    // 4. Custom Liquid Silk & Chromatic Dispersion Fragment Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uTime;
      varying vec2 vUv;

      // Simplex 2D noise for organic liquid ripple
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;

        // Interactive mouse distortion wave
        float dist = distance(uv, uMouse);
        float wave = smoothstep(0.45, 0.0, dist) * 0.025;
        float noiseVal = snoise(uv * 4.0 + vec2(uTime * 0.2));
        
        vec2 offset = normalize(uv - uMouse + 0.0001) * wave * (1.0 + noiseVal * 0.5);

        // Chromatic aberration on mouse wave
        float r = texture2D(uTexture, uv - offset * 1.3).r;
        float g = texture2D(uTexture, uv - offset).g;
        float b = texture2D(uTexture, uv - offset * 0.7).b;

        // Subtle luxury vignette
        float vig = 1.0 - smoothstep(0.5, 1.2, length(uv - 0.5) * 1.1);

        // Film grain
        float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233) * 2.0)) * 43758.5453) - 0.5) * 0.03;

        vec3 color = vec3(r, g, b) * vig + grain;
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: tex },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uTime: { value: 0 },
      },
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const quad = new THREE.Mesh(geometry, material)
    scene.add(quad)

    // 5. Mouse tracking with smooth lerp
    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouseX = (e.clientX - rect.left) / rect.width
      targetMouseY = 1.0 - (e.clientY - rect.top) / rect.height
    }
    container.addEventListener('mousemove', handlePointerMove)

    // 6. Animation loop
    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08

      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time
        materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY)
      }

      renderer.render(scene, camera)
    }
    animate()

    // 7. Resize handler
    const handleResize = () => {
      if (!container) return
      renderer.setSize(container.clientWidth, container.clientHeight)
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(
          container.clientWidth,
          container.clientHeight
        )
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(reqId)
      geometry.dispose()
      material.dispose()
      tex.dispose()
      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [currentImage])

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 overflow-hidden cursor-crosshair"
    />
  )
}
