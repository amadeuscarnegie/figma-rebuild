import { useReducer, useEffect, useRef, useCallback, useMemo } from "react"
import { QUIZ_QUESTIONS, QUIZ_META } from "@/data/quiz"
import { quizReducer, createInitialState } from "./quizReducer"
import ActivityNavbar from "./ActivityNavbar"
import QuestionPanel from "./QuestionPanel"
import ActivityFooter from "./ActivityFooter"
import EndScene from "./EndScene"

interface QuizActivityProps {
  onClose: () => void
}

export default function QuizActivity({ onClose }: QuizActivityProps) {
  const [state, dispatch] = useReducer(
    quizReducer,
    QUIZ_QUESTIONS,
    createInitialState,
  )

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Start/stop timer
  useEffect(() => {
    if (state.phase !== "complete") {
      timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [state.phase])

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESTART", questions: QUIZ_QUESTIONS })
  }, [])

  const handleRedoMistakes = useCallback(() => {
    const mistakeIds = new Set(
      state.results.filter((r) => !r.correct).map((r) => r.questionId),
    )
    const mistakeQuestions = QUIZ_QUESTIONS.filter((q) => mistakeIds.has(q.id))
    if (mistakeQuestions.length > 0) {
      dispatch({ type: "REDO_MISTAKES", questions: mistakeQuestions })
    }
  }, [state.results])

  // Enter key to check/continue
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return
      if (state.phase === "question" && state.selectedIndices.length > 0) {
        dispatch({ type: "CHECK_ANSWER" })
      } else if (state.phase === "feedback") {
        dispatch({ type: "CONTINUE" })
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [state.phase, state.selectedIndices.length])

  const question = state.questions[state.currentIndex]

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
      {state.phase !== "complete" && (
        <ActivityNavbar
          results={state.results}
          totalQuestions={state.questions.length}
          streakCount={streakCount}
          streakActive={streakActive}
          onClose={onClose}
        />
      )}

      {state.phase === "complete" ? (
        <EndScene
          results={state.results}
          totalMarks={QUIZ_META.totalMarks}
          elapsedSeconds={state.elapsedSeconds}
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
              canCheck={state.selectedIndices.length > 0}
              onCheck={() => dispatch({ type: "CHECK_ANSWER" })}
            />
          )}
        </>
      )}
    </div>
  )
}
