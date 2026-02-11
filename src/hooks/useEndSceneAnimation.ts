import { useState, useEffect, useRef, useCallback } from "react"
import { playSound } from "@/lib/playSound"
import powerup6 from "@/assets/sounds/Powerup_upgrade_6.wav"
import powerup1 from "@/assets/sounds/Powerup_upgrade_1.wav"
import powerup10 from "@/assets/sounds/Powerup_upgrade_10.wav"

const STAGE_DELAYS = [0, 1500, 2500, 3500, 4500, 5500] as const
const SOUNDS = [null, null, powerup6, powerup1, powerup10, null] as const

export function useEndSceneAnimation() {
  const [stage, setStage] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const skippedRef = useRef(false)

  useEffect(() => {
    for (let i = 1; i < STAGE_DELAYS.length; i++) {
      const timer = setTimeout(() => {
        if (skippedRef.current) return
        setStage(i)
        const sound = SOUNDS[i]
        if (sound) playSound(sound)
      }, STAGE_DELAYS[i])
      timersRef.current.push(timer)
    }

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const skip = useCallback(() => {
    if (skippedRef.current) return
    skippedRef.current = true
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setStage(5)
  }, [])

  return { stage, skip }
}
