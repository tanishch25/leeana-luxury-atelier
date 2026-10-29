import React, { useEffect, useRef } from 'react'

export const LuxurySilkShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // High-end Velvety Silk & Liquid Gold Caustics Shader
    const fsSource = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // 2D Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
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
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = uv;
        p.x *= aspect;

        // Subtle slow fluid wave
        float t = uTime * 0.12;
        vec2 mouse = uMouse / uResolution;
        mouse.x *= aspect;
        
        float dist = distance(p, mouse);
        float mouseInteraction = smoothstep(0.8, 0.0, dist) * 0.15;

        // Organic undulating silk layers
        float n1 = snoise(p * 1.2 + vec2(t * 0.3, t * 0.2));
        float n2 = snoise(p * 2.4 - vec2(t * 0.2, t * 0.4) + n1 * 0.4);
        float silk = n1 * 0.6 + n2 * 0.4;

        // Color palette: deep luxury obsidian with warm bronze sheen
        vec3 voidColor = vec3(0.024, 0.024, 0.028);      // Deepest black-slate
        vec3 silkSheen = vec3(0.08, 0.07, 0.065);        // Subtle satin highlight
        vec3 goldAccent = vec3(0.24, 0.19, 0.13);        // Refined champagne reflection

        vec3 col = mix(voidColor, silkSheen, smoothstep(-0.4, 0.6, silk));
        col = mix(col, goldAccent, pow(max(0.0, silk), 3.0) * 0.65);

        // Soft spotlight following mouse
        col += vec3(0.12, 0.09, 0.06) * mouseInteraction;

        // Soft vignette
        float vig = 1.0 - smoothstep(0.5, 1.4, length(uv - 0.5));
        col *= vig;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uRes = gl.getUniformLocation(program, 'uResolution')
    const uMouse = gl.getUniformLocation(program, 'uMouse')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    gl.viewport(0, 0, width, height)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetX = mouseX
    let targetY = mouseY

    const handlePointer = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = window.innerHeight - e.clientY
    }
    window.addEventListener('mousemove', handlePointer)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      gl.viewport(0, 0, width, height)
    }
    window.addEventListener('resize', handleResize)

    let reqId: number
    const startTime = performance.now()

    const render = () => {
      reqId = requestAnimationFrame(render)
      const now = performance.now()
      const elapsed = (now - startTime) * 0.001

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uRes, width, height)
      gl.uniform2f(uMouse, mouseX, mouseY)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', handlePointer)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(reqId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 opacity-90"
    />
  )
}
