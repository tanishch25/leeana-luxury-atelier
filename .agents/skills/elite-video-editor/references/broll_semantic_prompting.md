# Semantic B-Roll & Visual Asset Curation Handbook

This reference guides asset search and query transformation from literal spoken scripts into cinematic metaphors and archival mixed-media.

---

## 1. The Literal-to-Cinematic Query Transformation Table

| Script Concept | Literal (Banned / Cheap Stock) | Elite Metaphoric Search Queries |
| :--- | :--- | :--- |
| **Ambition / Starting Out** | "man smiling with laptop in coffee shop" | "extreme close up vintage light bulb filament glow dark", "blueprint architectural drafting hands pencil macro", "empty factory warehouse sunrise dust particles" |
| **Extreme Pressure / Stress** | "stressed executive touching forehead" | "analog pressure gauge needle shaking extreme macro", "fast ticking clock second hand shadow high contrast", "heavy rain splashing against windshield night neon" |
| **Rapid Financial Loss** | "red arrow going down on stock chart" | "sand spilling through hourglass close up slow motion", "water bursting through wooden barrier", "black dominoes collapsing one by one dark studio" |
| **Secrecy / Espionage** | "hacker hoodie green terminal numbers" | "1980s CCTV security camera rotating surveillance", "hand sliding manila folder classified across wooden desk", "venetian blinds casting high contrast shadows across eyes" |
| **Technological Scale** | "generic blue server room blinking lights" | "macro camera flight over microchip silicon wafer", "fiber optic light pulse dark abstract", "massive cooling tower steam release silhouette" |
| **Collapse / Failure** | "sad person sitting on curb" | "crumpled paper burning to black ash macro", "smoke clearing from demolished concrete building", "abandoned empty office chair rolling slowly" |

---

## 2. Archival & Mixed-Media Hierarchy
When high-quality stock video does not meet documentary standards, use the **Mixed-Media Fallback Pyramid**:

1. **Tier 1: Archival Document Scans (Public Domain & Historical)**
   * Declassified memos (CIA, FBI, government).
   * 19th/20th-century patent technical drawings.
   * Vintage newspaper microfiche scans.
2. **Tier 2: 2.5D Parallax on High-Resolution Stills**
   * Isolate the foreground subject using an AI mask.
   * Content-aware fill the background plate.
   * Apply a subtle Z-camera zoom ($105\%$ to $115\%$) while tracking the foreground with independent scale to create real stereoscopic depth.
3. **Tier 3: Abstract Macro Textures**
   * Ink spreading in water.
   * 35mm film burn / sprocket hole roll.
   * Typewriter hammer hitting ink ribbon.

---

## 3. Global Unification Treatment
To prevent disparate clips from looking like a disjointed amateur collage, apply the **Global Unification Stack**:
* **Shared Color Grade:** Warm shadows ($3200\text{K}$) with cool cyan midtones (standard documentary film print emulation).
* **35mm Film Grain:** Global overlay layer at $10\%$ opacity using *Overlay* blend mode.
* **Aspect Ratio Framing:** Add a consistent letterbox ($2.39:1$ widescreen or archival $4:3$ pillarbox) across all mixed media.
