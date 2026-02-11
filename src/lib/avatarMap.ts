import type { AvatarKey } from "@/data/gamification"
import avatarScuba from "@/assets/images/icons/Avatar_Scuba_V2_SVG.svg"
import avatarHeadphones from "@/assets/images/icons/Avatar_Headphones_V2_SVG.svg"
import avatarSherlock from "@/assets/images/icons/Avatar_Sherlock_V2_SVG.svg"
import avatarVillain from "@/assets/images/icons/Avatar_Villain_V2_SVG.svg"

export const AVATAR_MAP: Record<AvatarKey, string> = {
  scuba: avatarScuba,
  headphones: avatarHeadphones,
  sherlock: avatarSherlock,
  villain: avatarVillain,
}
