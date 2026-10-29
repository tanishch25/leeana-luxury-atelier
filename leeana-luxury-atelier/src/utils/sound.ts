// Procedural Web Audio API Sound Synthesizer
// Zero external audio files, 100% reliable, zero latency

class SoundSynthesizer {
  private ctx: AudioContext | null = null
  private ambientOsc1: OscillatorNode | null = null
  private ambientOsc2: OscillatorNode | null = null
  private ambientGain: GainNode | null = null
  public isMuted: boolean = true

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Soft tactile tick for hover interactions (1200Hz -> 400Hz subtle drop)
  public playHover() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  // Resonant tactile click for buttons (80Hz sub punch)
  public playClick() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(120, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch {
      // Silently ignore
    }
  }

  // Atmospheric luxury drone (Warm, velvety sub-bass bed)
  public toggleAmbience(): boolean {
    this.initContext()
    if (!this.ctx) return false

    if (!this.isMuted) {
      // Mute
      this.isMuted = true
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5)
      }
      return false
    } else {
      // Unmute & start drone
      this.isMuted = false
      if (!this.ambientOsc1) {
        // Root 48Hz
        this.ambientOsc1 = this.ctx.createOscillator()
        this.ambientOsc1.type = 'sine'
        this.ambientOsc1.frequency.setValueAtTime(48, this.ctx.currentTime)

        // Fifth 72Hz
        this.ambientOsc2 = this.ctx.createOscillator()
        this.ambientOsc2.type = 'sine'
        this.ambientOsc2.frequency.setValueAtTime(72.2, this.ctx.currentTime)

        // Lowpass filter
        const filter = this.ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(140, this.ctx.currentTime)

        this.ambientGain = this.ctx.createGain()
        this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime)
        this.ambientGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 1.2)

        this.ambientOsc1.connect(filter)
        this.ambientOsc2.connect(filter)
        filter.connect(this.ambientGain)
        this.ambientGain.connect(this.ctx.destination)

        this.ambientOsc1.start()
        this.ambientOsc2.start()
      } else if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.8)
      }
      this.playClick()
      return true
    }
  }
}

export const sound = new SoundSynthesizer()
