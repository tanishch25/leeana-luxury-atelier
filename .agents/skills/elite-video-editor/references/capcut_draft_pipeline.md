# CapCut / JianYing Draft Automation Handbook

This reference explains how to use Python (`pyCapCut` / `pyJianYingDraft`) to generate native CapCut draft project files without manual timeline assembly or slow rendering.

---

## 1. Why Draft Automation Wins
Rendering video purely through code (raw MoviePy/FFmpeg) is slow and struggles with complex GPU effects like optical flow speed ramps, 3D paper tears, camera shake, and smart keyframe easing.

**The Draft Generation Pattern:**
1. Python writes a valid `draft_content.json` conforming to CapCut's native project schema.
2. The draft is placed into CapCut's draft directory:
   * **Windows:** `%LOCALAPPDATA%\JianyingPro\User Data\Projects\com.lveditor.draft\` or `%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft\`
3. When the user opens CapCut/JianYing, the project is instantly loaded on the timeline with all tracks, transitions, keyframes, text styles, and audio layers pre-placed and ready to edit or export.

---

## 2. Multi-Track Architecture in pyCapCut

When generating drafts with `pyCapCut`:
* **Track 1 (Video Base):** Primary B-roll and visual assets with crossfade or flash cut transitions.
* **Track 2 (Cutouts / Overlays):** Paper-cut assets, documents, newspaper headlines with keyframed scale/position and 12fps posterize timing.
* **Track 3 (Animated Captions):** Kinetic typography generated with word-level Whisper timestamps.
* **Track 4 (Voiceover):** Clean vocal track.
* **Track 5 (SFX Track):** Offset 4-layer sound effects (whoosh, tactile snap, sub impact).
* **Track 6 (Music Bed):** Ducked background music track.

---

## 3. Workflow Integration with Cloned Repositories

In this workspace (`c:\Users\tanis\Documents\antigravity\splendid-planck`):
* Use `./pyCapCut` for assembling tracks, applying transition IDs, and exporting draft JSON.
* Use `./auto-editor` for preliminary voiceover cadence trimming and generating tight cut points.
* Use `./pedalboard` for batch audio mastering and frequency carving before attaching audio to drafts.
* Use `./vox-ai-motion-graphics-generator` for rendering isolated paper-collage scenes.
* Use `./Semantic-video-search` for scanning local B-roll folders via OpenCLIP natural language queries.
