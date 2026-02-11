import { RotateCcw, XCircle, ChevronRight } from "lucide-react"

interface ActionsCardProps {
  mistakeCount: number
  onRestart: () => void
  onRedoMistakes: () => void
}

export default function ActionsCard({
  mistakeCount,
  onRestart,
  onRedoMistakes,
}: ActionsCardProps) {
  return (
    <div className="w-full rounded-[12px] border-[1.5px] border-border bg-mcq-default-bg overflow-hidden">
      <button
        type="button"
        onClick={onRestart}
        className="flex items-center gap-[12px] w-full p-[20px] hover:bg-grey-50 transition-colors cursor-pointer text-left"
      >
        <RotateCcw className="w-[20px] h-[20px] text-grey-500 shrink-0" />
        <span className="font-semibold text-[14px] text-text-primary leading-normal flex-1">
          Restart quiz
        </span>
        <ChevronRight className="w-[20px] h-[20px] text-grey-500 shrink-0" />
      </button>

      {mistakeCount > 0 && (
        <>
          <div className="h-[1px] bg-border" />
          <button
            type="button"
            onClick={onRedoMistakes}
            className="flex items-center gap-[12px] w-full p-[20px] hover:bg-grey-50 transition-colors cursor-pointer text-left"
          >
            <XCircle className="w-[20px] h-[20px] text-[#f04438] shrink-0" />
            <span className="font-semibold text-[14px] text-text-primary leading-normal flex-1">
              Redo mistakes
            </span>
            <span className="flex items-center justify-center h-[28px] px-[12px] rounded-full bg-badge-danger-bg text-badge-danger-text text-[14px] font-semibold leading-normal">
              {mistakeCount}
            </span>
            <ChevronRight className="w-[20px] h-[20px] text-grey-500 shrink-0" />
          </button>
        </>
      )}
    </div>
  )
}
