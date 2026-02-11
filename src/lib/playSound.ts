let ctx: AudioContext | null = null
const buffers = new Map<string, AudioBuffer>()

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
    setupUnlock(ctx)
  }
  return ctx
}

/**
 * Persistent unlock listener that keeps retrying on every user gesture
 * until the AudioContext is confirmed running. Removes ALL listeners
 * once unlocked, instead of using { once: true } per event.
 */
function setupUnlock(audioCtx: AudioContext) {
  if (audioCtx.state === "running") return

  const events = ["touchstart", "touchend", "click", "keydown"] as const

  const unlock = () => {
    audioCtx.resume().then(() => {
      if (audioCtx.state === "running") {
        events.forEach((e) => document.removeEventListener(e, unlock))
      }
    })
  }

  events.forEach((e) => document.addEventListener(e, unlock, false))

  // Handle Safari's "interrupted" state (tab switch, phone call, screen lock).
  // Re-register unlock listeners so the next user gesture can resume playback.
  audioCtx.addEventListener("statechange", () => {
    if (audioCtx.state === "interrupted" || audioCtx.state === "suspended") {
      events.forEach((e) => document.addEventListener(e, unlock, false))
    }
  })
}

export async function preloadSound(src: string): Promise<void> {
  if (buffers.has(src)) return
  const response = await fetch(src)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await getContext().decodeAudioData(arrayBuffer)
  buffers.set(src, audioBuffer)
}

export function playSound(src: string, offset = 0) {
  const audioCtx = getContext()

  // Resume context if not running (browser autoplay policy).
  // On mobile this is often called from within a user gesture (tap on Check,
  // tap on Continue) so resume() succeeds synchronously in the gesture stack.
  if (audioCtx.state !== "running") {
    audioCtx.resume()
  }

  const buffer = buffers.get(src)
  if (buffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = buffer
    source.connect(audioCtx.destination)
    source.start(0, offset)
  }
}
