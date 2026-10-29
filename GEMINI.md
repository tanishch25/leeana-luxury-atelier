# Workspace Video Editing Standards & Instructions

This repository is configured for **high-production automated video editing, motion design, and audio engineering**.

Whenever performing video editing, scripting, pipeline development, or audio production in this workspace or for this user, strictly follow these core rules:

## 1. Visual Editing Rules
* **No Linear / Static Cuts:** Vary pacing dynamically between buildup (rapid 0.6s–1.2s cuts) and release (lingering 3.5s wide shots).
* **Paper-Cut & Tactile Aesthetic:** For motion graphics, infographics, and cutouts, drop playback to **12fps (Posterize Time)** to simulate authentic physical stop-motion. Use torn-paper borders, subtle texture overlays, and isometric camera tilt ($15^\circ–20^\circ$) on document callouts.
* **Flash Cuts & Transients:** Use 1–3 frame color-inverted or light-leak flashes on climax downbeats and cut 2 frames before vocal hits.

## 2. Sound Design Rules
* **The 4-Layer SFX Stack:** Never use a single isolated sound effect. Layer: (1) Background texture/bed, (2) Kinetic movement whoosh, (3) Tactile Foley (paper snap, click), (4) Sub-bass punch ($40\text{Hz}–80\text{Hz}$).
* **Frequency Carving:** Carve a $-4\text{dB}$ pocket at $1.5\text{kHz}–2.5\text{kHz}$ in background music so the spoken voice is always distinct. High-pass filter voiceovers at $80\text{Hz}$.
* **Sidechain Ducking & Silence Drops:** Duck music by $-14\text{dB}$ under voiceover; cut music completely dead 0.5s before critical plot twists or revelations.

## 3. Stock Footage & B-Roll Sourcing
* **Conceptual Metaphors:** Translate literal words into cinematic metaphors (e.g., "high pressure" $\rightarrow$ "ticking clock macro shadow" / "analog pressure gauge", not "smiling corporate actors").
* **Mixed-Media Priority:** When stock video is poor, pivot to 2.5D parallax on archival stills, patent blueprints, and declassified scans.
* **Global Unification:** Unify all assets with a single film emulation grade and global $35\text{mm}$ grain overlay ($10\%$ opacity).

## 4. Local Cloned Toolkits
The following tools are available locally in this workspace:
* `pyCapCut`: For generating native CapCut/JianYing draft files with GPU-accelerated transitions and keyframes.
* `auto-editor`: For automated silence and pacing trimming.
* `pedalboard`: Spotify's Python audio DSP library for studio EQ, compression, and sidechain ducking.
* `vox-ai-motion-graphics-generator`: For automated paper-collage explainer animations.
* `Semantic-video-search`: For OpenCLIP-based natural language B-roll search.


--------------------------------------------------------------------------------

# Creative Web Development & UI Standards

Whenever performing web development, frontend engineering, UI design, or landing page creation in this workspace or for this user, strictly follow these core rules:

## 1. Zero AI-Slop & Bespoke Design Mandate
* **Never Build Generic UI**: Strictly reject standard boilerplate aesthetics — no cookie-cutter cards, no default Inter/system fonts, no cliched purple gradients on white/dark backgrounds, and no static flexbox grids.
* **Anti-Robotic Typography Mandate**: Never use chunky, blocky, square, or robotic/sci-fi fonts (like heavy Syne, monospace coordinates, or tech badges) for luxury, couture, or premium brand experiences. Use timeless editorial serifs (Bodoni Moda, Italiana, Cormorant Garamond) paired with ultra-refined, airy modern grotesks (Geist, Cabinet Grotesk, Plus Jakarta Sans) with size-specific optical tracking (tight negative tracking `-0.02em` to `-0.04em` on large display titles, airy leading).
* **Emil Kowalski Craft & Apple Fluid Physics**:
  - All interactive elements must feel alive on pointer-down with instant feedback (`scale(0.97)` on `:active`).
  - Never animate from `scale(0)` — always start from `scale(0.95)` with `opacity: 0`.
  - Translucent materials use `backdrop-filter: blur(20px) saturate(180%)` with 1px hairline light-catching top edge `rgba(255,255,255,0.08)`.
  - Use critically damped springs (`damping: 1.0`, `response: 0.3-0.4s`) and custom cubic bezier easing (`cubic-bezier(0.23, 1, 0.32, 1)`).
* **Alternating Video & Motion Continuity**: Prioritize seamless, looping editorial video reels (`<video autoplay loop muted playsinline>`) with dynamic stage selectors over static placeholders or clumsy 3D polygons.
* **Aesthetics Over Geometry**: Spend performance budget on lighting, HDRI reflections, tone mapping (`ACESFilmicToneMapping`), and post-processing bloom first.
* **Lerp Everything**: No value should ever change abruptly. Camera position, rotations, scroll progress, and pointer coordinates must run through smooth damping factors ($0.06–0.10$).

## 2. Web Dev Mastery Skills (Always Active)
Leverage the cloned skills configured in `.agents/skills` and `~/.gemini/web-skills`:
1. `emil-skills`: Emil Kowalski's craft, interruptible spring physics, micro-interactions, and WWDC fluid UI principles.
2. `apple-experience`: Flagship Apple product launch design, titanium/obsidian dark palettes, video continuity, and luxury hardware aesthetics.
3. `awwwards-3d`: Three.js r170 + GSAP + Lenis scroll-driven 3D storytelling and camera choreography.
4. `react-three-fiber`: Declarative 3D Canvas architecture, `useFrame`, `useThree`, and high-performance render loops.
5. `drei`: `MeshTransmissionMaterial` frosted glass, `Text3D`, `Float`, `Environment`, and `ContactShadows`.
6. `gsap`: ScrollTrigger timelines, pinned sections, horizontal sliders, and split-text character reveals.
7. `r3f-scroll-rig`: 14islands DOM-to-WebGL synchronization, mapping 3D meshes directly over HTML elements.
8. `codrops-rain-effect`: Experimental water droplet physics, glass refraction shaders, and surface condensation.
9. `webgl-noise`: Ashima Simplex 2D/3D/4D and Perlin noise for vertex displacement and organic liquid surfaces.
10. `gradient-backdrops`: Custom GPU fragment shaders, domain warping, and noise-driven gradient backgrounds.
11. `lenis`: Inertia smooth scrolling, RAF loop synchronization with GSAP Ticker, and anchor navigation.
12. `portfolio-itom`: Complete immersive 3D website architecture, audio-visual sync, and Awwwards SOTY design persona.

## 3. WebGL & Performance Best Practices
* **Single WebGL Context**: Use one fixed `<GlobalCanvas>` for the entire page. Never instantiate multiple `<canvas>` elements across cards.
* **Cap Device Pixel Ratio**: Always enforce `dpr={[1, 2]}` (`Math.min(devicePixelRatio, 2)`) to avoid frying mobile GPUs.
* **Clean Cleanup & Disposal**: Always call `ctx.revert()` in GSAP and dispose geometries and textures on component unmount.
