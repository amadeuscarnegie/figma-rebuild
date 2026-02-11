import { useState, useEffect, useRef, useCallback } from "react"
import { playSound, preloadSound } from "@/lib/playSound"
import powerup6 from "@/assets/sounds/Powerup_upgrade_6.wav"
import powerup1 from "@/assets/sounds/Powerup_upgrade_1.wav"
import powerup10 from "@/assets/sounds/Powerup_upgrade_10.wav"
import winSound from "@/assets/sounds/Win_sound_4_1.wav"
import successSound from "@/assets/sounds/Success_7_1.wav"
import droneSound from "@/assets/sounds/Light_drone_1_1.wav"

const SOUND_SCHEDULE = [
  { time: 0, sounds: [{ src: winSound, offset: 0.47 }, { src: successSound, offset: 0.47 }] },
  { time: 1550, sounds: [{ src: droneSound, offset: 0 }] },
  { time: 2200, sounds: [{ src: powerup6, offset: 0 }] },
  { time: 2600, sounds: [{ src: powerup1, offset: 0 }] },
  { time: 3000, sounds: [{ src: powerup10, offset: 0 }] },
] as const

const STAGE_SCHEDULE = [
  { time: 0, stage: 0 },
  { time: 1350, stage: 1 },
  { time: 2100, stage: 2 },
  { time: 2500, stage: 3 },
  { time: 2600, stage: 4 },
  { time: 3400, stage: 5 },
] as const

export function useEndSceneAnimation() {
  const [stage, setStage] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const skippedRef = useRef(false)

  useEffect(() => {
    const startTime = performance.now()

    // Schedule stage transitions immediately (visual, no async dependency)
    for (const entry of STAGE_SCHEDULE) {
      if (entry.time === 0) continue // stage 0 is the initial state
      timersRef.current.push(
        setTimeout(() => {
          if (skippedRef.current) return
          setStage(entry.stage)
        }, entry.time),
      )
    }

    // Preload all sounds, then schedule with time compensation so
    // later sounds still fire at the correct wall-clock time.
    let cancelled = false
    Promise.all([
      preloadSound(powerup6),
      preloadSound(powerup1),
      preloadSound(powerup10),
      preloadSound(winSound),
      preloadSound(successSound),
      preloadSound(droneSound),
    ]).then(() => {
      if (cancelled || skippedRef.current) return

      const elapsed = performance.now() - startTime

      for (const entry of SOUND_SCHEDULE) {
        const remaining = entry.time - elapsed
        const fire = () => {
          if (skippedRef.current) return
          for (const s of entry.sounds) playSound(s.src, s.offset)
        }
        if (remaining <= 0) {
          fire()
        } else {
          timersRef.current.push(setTimeout(fire, remaining))
        }
      }
    })

    return () => {
      cancelled = true
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
