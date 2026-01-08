/**
 * HAPTIC AUDIO - Zero-latency Web Audio with humanization
 * 
 * Philosophy: "ASMR, not Cartoon"
 * 
 * Key Design Decisions:
 * - Web Audio API for instant playback (no HTML5 audio latency)
 * - Pitch randomization (±5%) prevents "robot" detection by brain
 * - Low volume (0.3-0.4 gain) respects user, avoids annoyance
 * - Pre-decoded audio buffer for zero latency
 * - Graceful degradation: fails silently if audio unavailable
 * 
 * Sound Profile Target:
 * - "Thick cardstock sliding against paper + soft mechanical thud"
 * - <150ms duration
 * - Low-end frequencies (bass), not high-end (treble)
 * 
 * @see https://signaturesounds.org/store/p/playing-card-sfx for CC0 sounds
 */

// Extend Window for webkit prefix
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext
    }
}

class HapticAudio {
    private context: AudioContext | null = null
    private buffer: AudioBuffer | null = null
    private loaded = false
    private loading = false

    constructor(soundUrl: string) {
        // Only initialize in browser environment
        if (typeof window !== 'undefined') {
            this.initContext()
            this.loadSound(soundUrl)
        }
    }

    private initContext() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext
            if (AudioContextClass) {
                this.context = new AudioContextClass()
            }
        } catch (e) {
            console.warn('HapticAudio: AudioContext not available', e)
        }
    }

    private async loadSound(url: string) {
        if (!this.context || this.loading) return

        this.loading = true

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }
            const arrayBuffer = await response.arrayBuffer()
            this.buffer = await this.context.decodeAudioData(arrayBuffer)
            this.loaded = true
        } catch (e) {
            // Graceful degradation: sound just won't play
            console.warn('HapticAudio: Failed to load sound -', e)
            this.loaded = false
        } finally {
            this.loading = false
        }
    }

    /**
     * Play the loaded sound with humanization
     * Safe to call even if sound failed to load
     */
    play() {
        if (!this.loaded || !this.buffer || !this.context) {
            return // Silent fail - no sound is better than broken UX
        }

        // Resume context if suspended (browser autoplay policy)
        if (this.context.state === 'suspended') {
            this.context.resume().catch(() => {
                // User hasn't interacted yet - ignore
            })
        }

        try {
            const source = this.context.createBufferSource()
            const gainNode = this.context.createGain()

            source.buffer = this.buffer

            // ═══════════════════════════════════════
            // HUMANIZATION ALGORITHM
            // Prevents the brain from detecting pattern
            // ═══════════════════════════════════════

            // Pitch variation: 0.95 to 1.05 (±5%)
            source.playbackRate.value = 0.95 + Math.random() * 0.1

            // Volume variation: 0.3 to 0.4 (KEEP IT QUIET)
            gainNode.gain.value = 0.3 + Math.random() * 0.1

            // Connect audio graph
            source.connect(gainNode)
            gainNode.connect(this.context.destination)

            // Play immediately
            source.start(0)
        } catch (e) {
            // Ignore playback errors
            console.warn('HapticAudio: Playback error', e)
        }
    }

    /**
     * Check if audio is ready to play
     */
    isReady(): boolean {
        return this.loaded && this.buffer !== null
    }
}

// ═══════════════════════════════════════
// SINGLETON PATTERN
// One instance shared across all components
// ═══════════════════════════════════════

let shuffleSound: HapticAudio | null = null

/**
 * Get the singleton shuffle sound instance
 * Lazy-initialized on first call
 */
export function getShuffleSound(): HapticAudio {
    if (!shuffleSound) {
        shuffleSound = new HapticAudio('/sounds/card-shuffle.wav')
    }
    return shuffleSound
}

export { HapticAudio }
export default HapticAudio
