export function playSound(src: string) {
  const audio = new Audio(src)
  audio.play().catch(() => {
    // Silently ignore if autoplay is blocked
  })
}
