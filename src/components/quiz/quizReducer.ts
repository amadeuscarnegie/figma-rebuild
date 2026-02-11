import type { QuizQuestion } from "@/data/quiz"
import type { QuizState, QuizAction, FeedbackType, QuestionResult } from "./types"

export function createInitialState(questions: QuizQuestion[]): QuizState {
  return {
    phase: "question",
    currentIndex: 0,
    questions,
    selectedIndices: [],
    results: [],
    feedbackType: null,
    elapsedSeconds: 0,
  }
}

export function computeFeedback(
  selectedIndices: number[],
  correctIndices: number[],
): { feedbackType: FeedbackType; marksEarned: number } {
  const correct = new Set(correctIndices)

  const correctSelected = selectedIndices.filter((i) => correct.has(i)).length
  const incorrectSelected = selectedIndices.filter((i) => !correct.has(i)).length

  if (correctSelected === correct.size && incorrectSelected === 0) {
    return { feedbackType: "correct", marksEarned: correct.size > 1 ? 2 : 1 }
  }

  if (correctSelected > 0 && incorrectSelected === 0) {
    return { feedbackType: "partial", marksEarned: 1 }
  }

  return { feedbackType: "incorrect", marksEarned: 0 }
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_OPTION": {
      if (state.phase !== "question") return state
      const question = state.questions[state.currentIndex]
      const isMultiSelect = question.correctIndices.length > 1

      if (isMultiSelect) {
        if (state.selectedIndices.includes(action.index)) return state
        if (state.selectedIndices.length >= question.marks) return state
        return { ...state, selectedIndices: [...state.selectedIndices, action.index] }
      }

      // Single select — replace
      return { ...state, selectedIndices: [action.index] }
    }

    case "DESELECT_OPTION": {
      if (state.phase !== "question") return state
      return {
        ...state,
        selectedIndices: state.selectedIndices.filter((i) => i !== action.index),
      }
    }

    case "CHECK_ANSWER": {
      if (state.phase !== "question" || state.selectedIndices.length === 0) return state

      const question = state.questions[state.currentIndex]
      const { feedbackType, marksEarned } = computeFeedback(
        state.selectedIndices,
        question.correctIndices,
      )

      const result: QuestionResult = {
        questionId: question.id,
        selectedIndices: [...state.selectedIndices],
        correct: feedbackType === "correct",
        marksEarned,
        maxMarks: question.marks,
      }

      return {
        ...state,
        phase: "feedback",
        feedbackType,
        results: [...state.results, result],
      }
    }

    case "CONTINUE": {
      if (state.phase !== "feedback") return state

      const nextIndex = state.currentIndex + 1
      if (nextIndex >= state.questions.length) {
        return { ...state, phase: "complete", feedbackType: null }
      }

      return {
        ...state,
        phase: "question",
        currentIndex: nextIndex,
        selectedIndices: [],
        feedbackType: null,
      }
    }

    case "TICK": {
      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 }
    }

    case "RESTART": {
      return createInitialState(action.questions)
    }

    case "REDO_MISTAKES": {
      return createInitialState(action.questions)
    }

    default:
      return state
  }
}
