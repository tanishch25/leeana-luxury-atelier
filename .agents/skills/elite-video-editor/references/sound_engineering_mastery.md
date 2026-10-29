# Sound Engineering & Audio Mastery Handbook

This reference specifies the audio architecture, EQ curves, sidechain ducking configurations, and Spotify Pedalboard DSP chains for broadcast-grade video sound design.

---

## 1. Frequency Carving Guide

| Frequency Range | What Lives Here | How to Process |
| :--- | :--- | :--- |
| **$< 80\text{Hz}$** | Sub-rumble, air conditioner noise, desk bumps | **High-pass filter (HPF)** at $80\text{Hz}$ on voiceover tracks. Keep completely clear for sub-bass impacts ($50\text{Hz}–70\text{Hz}$). |
| **$200\text{Hz}–400\text{Hz}$** | Warmth / "Mud" | Gentle $-2\text{dB}$ to $-3\text{dB}$ dip on voiceover to remove boxy room reflections. |
| **$1\text{kHz}–3.5\text{kHz}$** | **The Vocal Pocket (Intelligibility)** | **Crucial:** Carve a $-4\text{dB}$ bell curve at $2\text{kHz}$ with $Q=1.2$ out of background music so the spoken voice never fights the track. |
| **$5\text{kHz}–8\text{kHz}$** | Presence / Sibilance | Light de-esser on voiceover; gentle boost ($+1.5\text{dB}$) on Foley / tactile sound effects (paper snaps, shutter clicks). |
| **$> 12\text{kHz}$** | Air / Sparkle | Subtle high-shelf boost on vocals for studio sheen. |

---

## 2. Dynamic Sidechain Ducking Parameters
* **Vocal Detection Threshold:** $-24\text{dB}$ to $-28\text{dB}$.
* **Duck Depth:** $-14\text{dB}$ to $-18\text{dB}$ relative to music un-ducked volume.
* **Attack Time:** $15\text{ms}$ (smooth, prevents sudden harsh volume drop).
* **Release Time:** $350\text{ms}$ to $500\text{ms}$ (allows music to swell naturally during pauses between phrases).

---

## 3. Spotify `pedalboard` Python DSP Pipeline Blueprint

When processing audio programmatically, assemble the DSP chain using Spotify's `pedalboard`:

```python
from pedalboard import (
    Pedalboard, 
    HighpassFilter, 
    PeakFilter, 
    Compressor, 
    HighShelfFilter, 
    Limiter, 
    Gain
)
import soundfile as sf

# 1. Voiceover Mastering Board
voice_board = Pedalboard([
    HighpassFilter(cutoff_frequency_hz=80.0),                  # Kill mud & rumble
    PeakFilter(cutoff_frequency_hz=300.0, gain_db=-2.5, q=1.0),# De-mud
    Compressor(threshold_db=-18.0, ratio=3.5, attack_ms=10.0, release_ms=100.0), # Level consistency
    HighShelfFilter(cutoff_frequency_hz=10000.0, gain_db=2.0), # Air & presence
    Limiter(threshold_db=-1.0)                                # Prevent clipping
])

# 2. Background Music Carving Board (Creates the Vocal Pocket)
music_carve_board = Pedalboard([
    PeakFilter(cutoff_frequency_hz=2200.0, gain_db=-4.5, q=1.2), # Vocal pocket carve
    HighShelfFilter(cutoff_frequency_hz=12000.0, gain_db=-2.0),   # Tame highs
    Gain(gain_db=-12.0)                                           # Master bed level
])
```

---

## 4. The 4-Layer SFX Cue System
Every motion graphics transition must have an offset cue sequence:

* **$T - 15$ frames:** Start **Riser / Wind-up** (low-frequency suction or tape reel spin).
* **$T - 2$ frames:** **Flash / Transition Whoosh** (fast whip-pan swoosh).
* **$T = 0$ (Cut Point):** **Tactile Click/Snap** + **Sub Impact** ($60\text{Hz}$ thud).
* **$T + 3$ frames:** **High-frequency settling sound** (paper wrinkle settle or marker squeak).
