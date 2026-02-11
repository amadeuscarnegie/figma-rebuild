import { describe, it, expect } from "vitest"
import { quizReducer, createInitialState } from "../quizReducer"
import type { QuizState } from "../types"
import type { QuizQuestion } from "@/data/quiz"

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Q1?",
    options: ["A", "B", "C", "D"],
    correctIndices: [1],
    marks: 1,
  },
  {
    id: 2,
    text: "Q2?",
    options: ["A", "B", "C", "D"],
    correctIndices: [0, 2],
    marks: 2,
  },
]

function init(): QuizState {
  return createInitialState(MOCK_QUESTIONS)
}

describe("quizReducer", () => {
  it("creates initial state with question phase", () => {
    const state = init()
    expect(state.phase).toBe("question")
    expect(state.currentIndex).toBe(0)
    expect(state.selectedIndices).toEqual([])
    expect(state.results).toEqual([])
  })

  it("selects an option in single-select mode", () => {
    const state = quizReducer(init(), { type: "SELECT_OPTION", index: 2 })
    expect(state.selectedIndices).toEqual([2])
  })

  it("replaces selection in single-select mode", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 2 })
    state = quizReducer(state, { type: "SELECT_OPTION", index: 0 })
    expect(state.selectedIndices).toEqual([0])
  })

  it("deselects an option", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "DESELECT_OPTION", index: 1 })
    expect(state.selectedIndices).toEqual([])
  })

  it("does not check without selection", () => {
    const state = quizReducer(init(), { type: "CHECK_ANSWER" })
    expect(state.phase).toBe("question")
    expect(state.results).toEqual([])
  })

  it("checks correct single answer → feedback correct", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    expect(state.phase).toBe("feedback")
    expect(state.feedbackType).toBe("correct")
    expect(state.results).toHaveLength(1)
    expect(state.results[0].correct).toBe(true)
    expect(state.results[0].marksEarned).toBe(1)
  })

  it("checks incorrect single answer → feedback incorrect", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 0 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    expect(state.phase).toBe("feedback")
    expect(state.feedbackType).toBe("incorrect")
    expect(state.results[0].marksEarned).toBe(0)
  })

  it("continues to next question", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "CONTINUE" })
    expect(state.phase).toBe("question")
    expect(state.currentIndex).toBe(1)
    expect(state.selectedIndices).toEqual([])
  })

  it("completes quiz after last question", () => {
    let state = init()

    // Q1: correct
    state = quizReducer(state, { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "CONTINUE" })

    // Q2: correct (multi-select)
    state = quizReducer(state, { type: "SELECT_OPTION", index: 0 })
    state = quizReducer(state, { type: "SELECT_OPTION", index: 2 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "CONTINUE" })

    expect(state.phase).toBe("complete")
    expect(state.results).toHaveLength(2)
  })

  it("multi-select allows multiple selections", () => {
    let state = init()
    // Advance to Q2 (multi-select)
    state = quizReducer(state, { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "CONTINUE" })

    state = quizReducer(state, { type: "SELECT_OPTION", index: 0 })
    state = quizReducer(state, { type: "SELECT_OPTION", index: 2 })
    expect(state.selectedIndices).toEqual([0, 2])
  })

  it("partial correct for multi-select gives partial feedback", () => {
    let state = init()
    // Advance to Q2
    state = quizReducer(state, { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "CONTINUE" })

    // Select only one of two correct answers
    state = quizReducer(state, { type: "SELECT_OPTION", index: 0 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    expect(state.feedbackType).toBe("partial")
    expect(state.results[1].marksEarned).toBe(1)
  })

  it("RESTART resets to initial state", () => {
    let state = init()
    state = quizReducer(state, { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "RESTART", questions: MOCK_QUESTIONS })
    expect(state.phase).toBe("question")
    expect(state.currentIndex).toBe(0)
    expect(state.results).toEqual([])
  })

  it("REDO_MISTAKES creates quiz with provided questions", () => {
    const mistakeQ = [MOCK_QUESTIONS[1]]
    let state = init()
    state = quizReducer(state, { type: "REDO_MISTAKES", questions: mistakeQ })
    expect(state.questions).toHaveLength(1)
    expect(state.questions[0].id).toBe(2)
  })

  it("ignores SELECT_OPTION during feedback phase", () => {
    let state = quizReducer(init(), { type: "SELECT_OPTION", index: 1 })
    state = quizReducer(state, { type: "CHECK_ANSWER" })
    state = quizReducer(state, { type: "SELECT_OPTION", index: 0 })
    expect(state.selectedIndices).toEqual([1])
  })

  it("ignores CONTINUE during question phase", () => {
    const state = quizReducer(init(), { type: "CONTINUE" })
    expect(state.phase).toBe("question")
    expect(state.currentIndex).toBe(0)
  })
})
