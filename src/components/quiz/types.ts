import type { QuizQuestion } from "@/data/quiz"

export const OptionState = {
  Default: "default",
  Hover: "hover",
  Selected: "selected",
  Correct: "correct",
  Incorrect: "incorrect",
  Answer: "answer",
  Disabled: "disabled",
} as const

export type OptionState = (typeof OptionState)[keyof typeof OptionState]

export type QuizPhase = "question" | "feedback" | "complete"

export type FeedbackType = "correct" | "partial" | "incorrect"

export interface QuestionResult {
  questionId: number
  selectedIndices: number[]
  correct: boolean
  marksEarned: number
  maxMarks: number
}

export interface QuizState {
  phase: QuizPhase
  currentIndex: number
  questions: QuizQuestion[]
  selectedIndices: number[]
  results: QuestionResult[]
  feedbackType: FeedbackType | null
  elapsedSeconds: number
}

export type QuizAction =
  | { type: "SELECT_OPTION"; index: number }
  | { type: "DESELECT_OPTION"; index: number }
  | { type: "CHECK_ANSWER" }
  | { type: "CONTINUE" }
  | { type: "TICK" }
  | { type: "RESTART"; questions: QuizQuestion[] }
  | { type: "REDO_MISTAKES"; questions: QuizQuestion[] }
