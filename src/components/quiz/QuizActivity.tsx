import { useReducer, useEffect, useRef, useCallback, useMemo, useState } from "react"
import { QUIZ_QUESTIONS, QUIZ_META } from "@/data/quiz"
import { quizReducer, createInitialState, computeFeedback } from "./quizReducer"
import { playSound, preloadSound } from "@/lib/playSound"
import correctSound from "@/assets/sounds/duolingo-correct.mp3"
import wrongSound from "@/assets/sounds/duolingo-wrong.mp3"
import { Play } from "lucide-react"
import ActivityNavbar from "./ActivityNavbar"
import QuestionPanel from "./QuestionPanel"
import ActivityFooter from "./ActivityFooter"
import EndScene from "./EndScene"
import type { QuestionResult } from "./types"

const DEBUG_RESULTS: QuestionResult[] = QUIZ_QUESTIONS.map((q, i) => ({
  questionId: q.id,
  selectedIndices: q.correctIndices,
  correct: i % 4 !== 3, // 75% correct
  marksEarned: i % 4 !== 3 ? q.marks : 0,
  maxMarks: q.marks,
}))

interface QuizActivityProps {
  onClose: () => void
}

export default function QuizActivity({ onClose }: QuizActivityProps) {
  const [state, dispatch] = useReducer(
    quizReducer,
    QUIZ_QUESTIONS,
    createInitialState,
  )

  // Preload feedback sounds into Web Audio API buffers
  useEffect(() => {
    preloadSound(correctSound)
    preloadSound(wrongSound)
  }, [])

  // Ref-based timer — avoids per-second re-renders of the entire tree.
  // Elapsed time is captured once when the quiz completes.
  const startTimeRef = useRef(Date.now())
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (state.phase === "complete") {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }
  }, [state.phase])

  const stateRef = useRef(state)
  stateRef.current = state

  const handleCheck = useCallback(() => {
    const s = stateRef.current
    const q = s.questions[s.currentIndex]
    const { feedbackType } = computeFeedback(s.selectedIndices, q.correctIndices)
    playSound(feedbackType === "incorrect" ? wrongSound : correctSound)
    dispatch({ type: "CHECK_ANSWER" })
  }, [])

  const handleRestart = useCallback(() => {
    startTimeRef.current = Date.now()
    setElapsedSeconds(0)
    dispatch({ type: "RESTART", questions: QUIZ_QUESTIONS })
  }, [])

  const handleRedoMistakes = useCallback(() => {
    const mistakeIds = new Set(
      state.results.filter((r) => !r.correct).map((r) => r.questionId),
    )
    const mistakeQuestions = QUIZ_QUESTIONS.filter((q) => mistakeIds.has(q.id))
    if (mistakeQuestions.length > 0) {
      startTimeRef.current = Date.now()
      setElapsedSeconds(0)
      dispatch({ type: "REDO_MISTAKES", questions: mistakeQuestions })
    }
  }, [state.results])

  const question = state.questions[state.currentIndex]

  // Enter key to check/continue — reads from stateRef so the listener is stable
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return
      const s = stateRef.current
      const q = s.questions[s.currentIndex]
      if (s.phase === "question" && s.selectedIndices.length === q.marks) {
        handleCheck()
      } else if (s.phase === "feedback") {
        dispatch({ type: "CONTINUE" })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleCheck])

  // Debug: skip to end scene instantly with mock data
  const [debugEndScene, setDebugEndScene] = useState(false)
  const [endSceneKey, setEndSceneKey] = useState(0)
  const showEndScene = state.phase === "complete" || debugEndScene

  const debugResults = DEBUG_RESULTS

  // Compute streak: count consecutive correct answers from the end of results
  const { streakCount, streakActive } = useMemo(() => {
    let count = 0
    for (let i = state.results.length - 1; i >= 0; i--) {
      if (state.results[i].correct) count++
      else break
    }
    return { streakCount: count, streakActive: count > 0 }
  }, [state.results])

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Debug: play/replay end scene button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (debugEndScene) {
            setEndSceneKey((k) => k + 1)
          } else {
            setDebugEndScene(true)
          }
        }}
        className="absolute top-[12px] right-[12px] z-[100] w-[32px] h-[32px] rounded-full bg-grey-200 flex items-center justify-center cursor-pointer hover:bg-grey-300 transition-colors opacity-50 hover:opacity-100"
        aria-label="Debug: play end scene"
        title="Debug: play end scene"
      >
        <Play className="w-[16px] h-[16px] text-grey-600 ml-[2px]" />
      </button>

      {!showEndScene && (
        <ActivityNavbar
          results={state.results}
          totalQuestions={state.questions.length}
          streakCount={streakCount}
          streakActive={streakActive}
          onClose={onClose}
        />
      )}

      {showEndScene ? (
        <EndScene
          key={endSceneKey}
          results={debugEndScene ? debugResults : state.results}
          totalMarks={QUIZ_META.totalMarks}
          elapsedSeconds={debugEndScene ? 47 : elapsedSeconds}
          xpEarned={QUIZ_META.xpReward}
          nextLabel={QUIZ_META.subject}
          onRestart={handleRestart}
          onRedoMistakes={handleRedoMistakes}
          onContinue={onClose}
          onClose={onClose}
        />
      ) : (
        <>
          <QuestionPanel
            questionText={question.text}
            options={question.options}
            selectedIndices={state.selectedIndices}
            correctIndices={question.correctIndices}
            phase={state.phase}
            onSelect={(index) => dispatch({ type: "SELECT_OPTION", index })}
            onDeselect={(index) => dispatch({ type: "DESELECT_OPTION", index })}
          />

          {state.phase === "feedback" && state.feedbackType ? (
            <ActivityFooter
              key={state.results.length}
              mode="feedback"
              feedbackType={state.feedbackType}
              onContinue={() => dispatch({ type: "CONTINUE" })}
            />
          ) : (
            <ActivityFooter
              mode="question"
              marks={question.marks}
              canCheck={state.selectedIndices.length === question.marks}
              onCheck={handleCheck}
            />
          )}
        </>
      )}
    </div>
  )
}
