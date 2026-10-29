---
name: elite-video-editor
description: Master blueprint and automation framework for elite, high-retention video editing, Vox-style paper-cut motion graphics, tactile 4-layer sound design, CapCut/JianYing draft scripting, and semantic B-roll curation. Use whenever the user asks to edit videos, produce shorts/reels, automate video creation, script video editing pipelines, generate motion graphics, or engineer sound design for video.
---

# Elite Video Editing Mastery & Automation

This skill equips the agent with top-tier editorial craftsmanship, Hollywood-grade sound design principles, and automated pipeline tooling. When editing, automating, or scripting videos, **never produce flat, static slideshows with generic background music**. Every video must feel tactile, dynamic, and acoustically weighted.

---

## The 4 Pillars of Elite Video Editing

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ELITE VIDEO ARCHITECTURE                        │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. VISUAL GRAMMAR │ 2. SOUND DESIGN   │ 3. ASSET CURATION              │
│ - Paper-Cut 12fps │ - 4-Layer SFX     │ - Semantic Metaphoric Queries  │
│ - Flash cuts      │ - Ducking & EQ    │ - 2.5D Parallax on Stills      │
│ - Vox tilt & wipe │ - Absolute Silence│ - 35mm Grain Unification       │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ 4. AUTOMATION TOOLKIT                                                  │
│ - pyCapCut: GPU-accelerated draft generation with native transitions   │
│ - auto-editor: Frame-accurate pacing & silence elimination             │
│ - spotify/pedalboard: Studio DSP audio mastering & sidechain ducking   │
│ - vox-ai-motion-graphics: Isometric paper-collage explainer pipelines  │
│ - Semantic-video-search: CLIP-based mood and cinematography matching   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Pillar 1: Visual Grammar & Vox-Style Pacing

### 1. The Paper-Cut / Mixed-Media Aesthetic
* **Framerate Reduction (Posterize Time):** Drop motion graphics, document pop-ups, and paper animations to **12fps or 8fps**. Real video runs at 24fps/60fps; lowering graphic framerate provides an authentic tactile stop-motion texture.
* **Torn Edge & Jitter:** Every cut-out PNG must have a rough white torn border and an organic paper texture overlay (Blend mode: *Multiply* or *Overlay*). Give drop shadows a 1-to-2-frame random jitter offset rather than static soft blur.
* **Isometric Evidence Boards:** 
  * Tilt newspaper articles, patents, tweets, and documents $15^\circ$ to $25^\circ$ along the 3D Z/Y axis.
  * Push in with an ease-out camera drift.
  * Animate a yellow or black highlighter bar wiping across the 3–5 key words while reducing ambient document opacity by $40\%$.

### 2. Pacing Formula (Staccato vs. Legato)
* **Never use fixed cut intervals:** A cut every 2.5 seconds feels robotic.
* **Crescendo Sequence (Building Tension):**
  * Shot 1: Establishing / Wide (2.0s)
  * Shot 2: Medium Detail (1.2s)
  * Shot 3: Macro / Tight (0.6s)
  * Shot 4: Flash Cut / Inversion (0.2s / 3–5 frames)
* **The Breather:** Immediately follow rapid cuts with a lingering 3.5s wide shot to reset viewer cognitive load.
* **Flash Cuts & Match Cuts:**
  * Use 1-to-3 frame inverted color, white solid, or high-contrast texture flashes on downbeats or sudden revelations.
  * Align cuts **2 frames before** vocal transients hit.

---

## Pillar 2: Audio Engineering & Sound Design

### 1. The 4-Layer SFX Stack
Never drop a single naked sound effect on a transition. Layer them:
1. **The Bed (Ambience):** Vinyl crackle, tape hiss, 60Hz hum, or low atmospheric drone underneath the scene.
2. **The Kinetic (Movement):** Deep whoosh, whip transition, cloth swish, or air riser alerting the ear that an element is moving.
3. **The Tactile (Impact/Action):** Paper snap, mechanical typewriter clack, camera shutter click, switch flip giving physical weight.
4. **The Punctuation (Subconscious Weight):** $40\text{Hz}–80\text{Hz}$ sub-bass boom, muted cinematic braam, or kick thud.

### 2. Frequency Carving & The Voice Pocket
* **Human Voice Pocket:** The spoken voice lives between **$1\text{kHz}$ and $3.5\text{kHz}$**.
* **Music EQ:** Carve a $-3\text{dB}$ to $-5\text{dB}$ dip in background music at $1.5\text{kHz}–2.5\text{kHz}$ so voiceovers remain crystal clear without raising voice volume.
* **Sub-Bass Cleanup:** High-pass filter voiceover tracks at $80\text{Hz}$ to eliminate mic rumble and room thumps.

### 3. Dynamic Sidechain Ducking
* Background music must automatically drop by $-12\text{dB}$ to $-16\text{dB}$ when voiceover is speaking, and gently swell up by $+4\text{dB}$ during sentence pauses.
* **The Vacuum of Silence:** Completely silence background music and ambience 0.5s before a major plot twist or punchline. Pure dead air forces immediate audience focus.

---

## Pillar 3: Semantic Stock & Asset Curation

### 1. The Conceptual Metaphor Rule
Never query literal words from the script. Translate voiceover lines into cinematic metaphors:
* *Bad (Literal):* "Stressed businessman" $\rightarrow$ *Elite (Metaphoric):* "Clock ticking fast macro shadow", "matchstick burning down slow motion".
* *Bad (Literal):* "Losing money" $\rightarrow$ *Elite (Metaphoric):* "Water leaking through cracked dam", "sand running through hourglass extreme close up".
* *Bad (Literal):* "Secret deal" $\rightarrow$ *Elite (Metaphoric):* "Surveillance tape VHS timestamp 1990s", "blinds closing casting dramatic shadows".

### 2. Mixed-Media & 2.5D Parallax
* If high-quality stock video is unavailable, **never use cheesy stock video**.
* Use high-res archival stills, museum scans, or patent blueprints.
* Separate the foreground subject from the background and apply a subtle 2.5D Z-axis camera push with depth-of-field blur.

### 3. Global Color & Grain Unification
Disparate stock footage and graphics will look disjointed unless glued together:
* Apply a global film print LUT (e.g., Kodak 2383 or neutral teal/warm).
* Overlay global $35\text{mm}$ film grain at $8\%–12\%$ opacity across the entire timeline.
* Add a subtle cinematic vignette ($5\%–10\%$).

---

## Pillar 4: Installed Automation Repositories

The following repositories are cloned in the workspace root for direct pipeline assembly:

1. **`pyCapCut` (`./pyCapCut`)**:
   * Generates CapCut/JianYing draft JSON files programmatically.
   * Leverages CapCut's native GPU render engine for flash cuts, paper tears, camera shakes, and optical flow speed ramps.
2. **`auto-editor` (`./auto-editor`)**:
   * Analyzes audio/video waveforms to cut dead air, pauses, and slow sections automatically.
   * Generates XML/EDL timelines for Premiere, DaVinci, or direct FFmpeg renders.
3. **`pedalboard` (`./pedalboard`)**:
   * Spotify's studio-grade Python audio DSP library.
   * Handles multi-band EQ, studio compression, sidechain ducking, limiters, and VST3 plugins programmatically.
4. **`vox-ai-motion-graphics-generator` (`./vox-ai-motion-graphics-generator`)**:
   * Generates automated Vox-style paper-collage scenes, isometric layouts, and dynamic typography.
5. **`Semantic-video-search` (`./Semantic-video-search`)**:
   * CLIP-powered semantic video search engine to index and slice B-roll vaults by cinematic mood and cinematography terms.

---

## Reference Manuals

* Detailed Paper-Cut parameters: [vox_paper_cut_handbook.md](./references/vox_paper_cut_handbook.md)
* Sound Design & DSP recipes: [sound_engineering_mastery.md](./references/sound_engineering_mastery.md)
* Semantic B-roll prompt tables: [broll_semantic_prompting.md](./references/broll_semantic_prompting.md)
* CapCut Draft automation schemas: [capcut_draft_pipeline.md](./references/capcut_draft_pipeline.md)
