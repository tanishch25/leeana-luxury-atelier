# Vox-Style Paper-Cut & Documentary Visual Handbook

This reference specifies the visual guidelines and mathematical properties required to produce the Vox / Johnny Harris / Magnates Media documentary aesthetic.

---

## 1. Frame Rate & Motion Decoupling
* **The Stop-Motion Illusion:** Video runs at 24fps or 30fps, but motion graphics elements must be rendered at **12fps or 8fps** (Posterize Time).
* This mismatch between smooth video backgrounds and stepped cutout animations immediately triggers the psychological perception of hand-crafted physical stop-motion animation.

---

## 2. The Anatomy of a Paper Cutout
Never use a transparent PNG directly on screen. Treat every graphic like physical cardstock:

```
┌──────────────────────────────────────────────┐
│  Layer 4: Highlights / Wear & Tear           │ (Fold creases, yellow aging edges)
├──────────────────────────────────────────────┤
│  Layer 3: Paper Texture Overlay              │ (Multiply or Overlay, 20-30% opacity)
├──────────────────────────────────────────────┤
│  Layer 2: Subject PNG                        │ (Cutout subject or headline)
├──────────────────────────────────────────────┤
│  Layer 1: Torn White Edge Outline            │ (Rough 4-8px uneven white border)
├──────────────────────────────────────────────┤
│  Layer 0: Jitter Drop Shadow                 │ (Opacity 40%, 15px distance, 1-2 frame jitter)
└──────────────────────────────────────────────┘
```

* **Torn Edge Generation:** An uneven 4–8px white contour with micro-perforations.
* **Anchor Props:** Place realistic PNG assets at corners:
  * Masking tape / duct tape with semi-transparent glue sheen.
  * Red pushpins with angled shadows.
  * Staple marks with indentations.

---

## 3. The Isometric Evidence Board
When displaying documents, court filings, financial charts, or articles:
1. **Camera Angle:**
   * Rotate $18^\circ$ on the X-axis (tilt back).
   * Rotate $-12^\circ$ to $-18^\circ$ on the Y-axis (isometric perspective).
   * Add a focal plane with depth-of-field blur on background objects.
2. **Camera Move:**
   * Slow drift push-in ($+8\%$ scale over 4 seconds) with ease-out cubic curve.
3. **Highlighter Wipe Animation:**
   * A translucent yellow bar (`rgba(255, 235, 59, 0.65)`) or black redaction bar wipes horizontally across the exact 3 to 6 words being spoken.
   * Sync a marker squeak sound effect on the wipe start.
   * Dim the rest of the document to $60\%$ brightness to force total eye tracking to the highlighted phrase.

---

## 4. Flash Cuts and Pacing Hierarchy
* **Duration:** 1 to 3 frames ($0.04\text{s}–0.12\text{s}$).
* **Trigger Conditions:**
  * Downbeat of music crescendo.
  * Sentence pivot (e.g., *"However...", "Until everything collapsed."*).
  * 2 frames prior to vocal transient.
* **Flash Textures:**
  * Inverted color frame (Negative).
  * High-contrast 35mm film burn / light leak.
  * Rapid archival flash (3 consecutive single-frame historical stills before the main shot).
