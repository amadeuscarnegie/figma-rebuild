import { useEffect, useRef, type RefObject } from "react"
import lottie, { type AnimationItem } from "lottie-web"

interface UseLottieOptions {
  path: string
  containerRef: RefObject<HTMLDivElement | null>
  autoplay?: boolean
}

export function useLottie({ path, containerRef, autoplay = true }: UseLottieOptions) {
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const anim = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: false,
      autoplay,
      path,
    })

    animRef.current = anim

    // After initial play completes, loop frames 360-480
    anim.addEventListener("complete", () => {
      anim.playSegments([360, 480], true)
      anim.loop = true
    })

    return () => {
      anim.destroy()
      animRef.current = null
    }
  }, [path, containerRef, autoplay])

  return animRef
}
