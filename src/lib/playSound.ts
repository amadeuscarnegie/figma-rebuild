let ctx: AudioContext | null = null
const buffers = new Map<string, AudioBuffer>()

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()

    // On mobile, AudioContext starts suspended and needs a user gesture to resume.
    // Register a one-time listener on the first touch/click to unlock it.
    const unlock = () => {
      if (ctx && ctx.state === "suspended") {
        ctx.resume()
      }
      document.removeEventListener("touchstart", unlock)
      document.removeEventListener("touchend", unlock)
      document.removeEventListener("click", unlock)
    }
    document.addEventListener("touchstart", unlock, { once: true })
    document.addEventListener("touchend", unlock, { once: true })
    document.addEventListener("click", unlock, { once: true })
  }
  return ctx
}

export async function preloadSound(src: string): Promise<void> {
  if (buffers.has(src)) return
  const response = await fetch(src)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await getContext().decodeAudioData(arrayBuffer)
  buffers.set(src, audioBuffer)
}

export function playSound(src: string) {
  const audioCtx = getContext()

  // Resume context if suspended (browser autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume()
  }

  const buffer = buffers.get(src)
  if (buffer) {
    const source = audioCtx.createBufferSource()
    source.buffer = buffer
    source.connect(audioCtx.destination)
    source.start(0)
  } else {
    // Fallback for non-preloaded sounds
    const audio = new Audio(src)
    audio.play().catch(() => {})
  }
}
