import { useState, useEffect, useRef } from "react"

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export function useCountUp(
  target: number,
  { duration = 800, enabled = true }: { duration?: number; enabled?: boolean } = {},
): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }

    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, enabled])

  return enabled ? value : 0
}
