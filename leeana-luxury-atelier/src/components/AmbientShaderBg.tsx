import React, { useEffect, useRef } from 'react'

export const AmbientShaderBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // GPU Fragment Shader: Domain-warped Simplex Liquid
    const fsSource = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // Ashima Simplex 2D noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
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
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        // Interactive mouse offset with subtle wave
        vec2 mouseNorm = uMouse / uResolution;
        float distToMouse = distance(vUv, mouseNorm);

        // Domain warping
        vec2 q = vec2(0.0);
        q.x = snoise(st + 0.05 * uTime);
        q.y = snoise(st + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime);
        r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

        float f = snoise(st + r);

        // Palette blending
        // Deep obsidian void
        vec3 colorVoid = vec3(0.018, 0.016, 0.024);
        // Rich champagne bronze silk
        vec3 colorGold = vec3(0.18, 0.13, 0.08);
        // Dark nocturnal slate
        vec3 colorSlate = vec3(0.04, 0.035, 0.055);

        vec3 col = mix(colorVoid, colorSlate, clamp((f*f)*4.0, 0.0, 1.0));
        col = mix(col, colorGold, clamp(length(q) * 0.45, 0.0, 1.0));

        // Subtle specular glow around mouse position
        float mouseGlow = smoothstep(0.4, 0.0, distToMouse) * 0.12;
        col += vec3(0.22, 0.18, 0.12) * mouseGlow;

        // Vignette
        float vignette = 1.0 - smoothstep(0.5, 1.4, length(vUv - 0.5));
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compileShader(src: string, type: number) {
      if (!gl) return null
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER)
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen quad
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posAttr = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posAttr)
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

    const uTimeLoc = gl.getUniformLocation(program, 'uTime')
    const uResLoc = gl.getUniformLocation(program, 'uResolution')
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    gl.viewport(0, 0, width, height)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handlePointer = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = window.innerHeight - e.clientY
    }
    window.addEventListener('mousemove', handlePointer)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      gl.viewport(0, 0, width, height)
    }
    window.addEventListener('resize', handleResize)

    let animId: number
    let startTime = performance.now()

    const render = () => {
      animId = requestAnimationFrame(render)
      const now = performance.now()
      const time = (now - startTime) * 0.0006

      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08

      gl.uniform1f(uTimeLoc, time)
      gl.uniform2f(uResLoc, width, height)
      gl.uniform2f(uMouseLoc, mouseX, mouseY)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', handlePointer)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 opacity-80"
    />
  )
}
