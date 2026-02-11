export interface QuizQuestion {
  id: number
  text: string
  options: string[]
  correctIndices: number[]
  marks: number
}

export interface QuizMeta {
  title: string
  subject: string
  totalMarks: number
  xpReward: number
}

export const QUIZ_META: QuizMeta = {
  title: "Cell Biology",
  subject: "Biology",
  totalMarks: 7,
  xpReward: 50,
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Which of the following is the powerhouse of the cell?",
    options: [
      "Nucleus",
      "Mitochondria",
      "Ribosome",
      "Endoplasmic reticulum",
    ],
    correctIndices: [1],
    marks: 1,
  },
  {
    id: 2,
    text: "Which two organelles are involved in protein synthesis?",
    options: [
      "Ribosomes",
      "Golgi apparatus",
      "Rough endoplasmic reticulum",
      "Lysosomes",
    ],
    correctIndices: [0, 2],
    marks: 2,
  },
  {
    id: 3,
    text: "What is the primary function of the cell membrane?",
    options: [
      "Producing energy",
      "Storing genetic information",
      "Controlling what enters and leaves the cell",
      "Breaking down waste products",
    ],
    correctIndices: [2],
    marks: 1,
  },
  {
    id: 4,
    text: "Which structures are found in plant cells but not in animal cells?",
    options: [
      "Cell wall",
      "Mitochondria",
      "Chloroplasts",
      "Ribosomes",
    ],
    correctIndices: [0, 2],
    marks: 2,
  },
  {
    id: 5,
    text: "What is the role of the nucleus in a cell?",
    options: [
      "Photosynthesis",
      "Controlling cell activities and storing DNA",
      "Digesting food particles",
      "Transporting proteins",
    ],
    correctIndices: [1],
    marks: 1,
  },
]
