import { useState } from "react"
import { Mail, Trophy, Sparkles } from "lucide-react"
import Toggle from "@/components/ui/Toggle"
import { Card, CardTitle } from "./SettingsCard"

function PreferenceRow({
  icon: Icon,
  title,
  description,
  extra,
  enabled,
  onToggle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  extra?: React.ReactNode
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-[16px]">
      <div className="flex gap-[12px] items-start flex-1 min-w-0">
        <Icon className="w-[20px] h-[20px] text-text-primary shrink-0 mt-[2px]" />
        <div className="flex flex-col gap-[4px] leading-normal">
          <p className="font-semibold text-[16px] text-text-primary">{title}</p>
          <p className="font-normal text-[14px] text-text-muted">{description}</p>
          {extra}
        </div>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  )
}

export default function PreferencesCard() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [publicLeaderboards, setPublicLeaderboards] = useState(true)
  const [aiMarking, setAiMarking] = useState(true)

  return (
    <Card>
      <CardTitle>Preferences</CardTitle>

      <PreferenceRow
        icon={Mail}
        title="Email notifications"
        description="Receive weekly summaries and achievement alerts."
        enabled={emailNotifs}
        onToggle={() => setEmailNotifs((v) => !v)}
      />

      <PreferenceRow
        icon={Trophy}
        title="Public leaderboards"
        description="Show your profile and stats on public league standings."
        enabled={publicLeaderboards}
        onToggle={() => setPublicLeaderboards((v) => !v)}
      />

      <PreferenceRow
        icon={Sparkles}
        title="AI marking"
        description="Allow AI to automatically grade your subjective answers."
        extra={
          <p className="font-normal text-[14px] text-blue-600 underline mt-[8px] cursor-pointer">
            Learn more
          </p>
        }
        enabled={aiMarking}
        onToggle={() => setAiMarking((v) => !v)}
      />
    </Card>
  )
}
