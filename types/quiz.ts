export type QuizType = 'msq' | 'drag-drop' | 'click-select'

export type Difficulty = 'beginner' | 'intermediate' | 'expert'

export interface BaseQuestion {
  id: string
  type: QuizType
  difficulty: Difficulty
  question: string
  explanation: string
  points: number
}

export interface MSQQuestion extends BaseQuestion {
  type: 'msq'
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop'
  items: {
    id: string
    text: string
    category: string
  }[]
  categories: {
    id: string
    name: string
    description: string
  }[]
}

export interface ClickSelectQuestion extends BaseQuestion {
  type: 'click-select'
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

export type Question = MSQQuestion | DragDropQuestion | ClickSelectQuestion

export interface UserProgress {
  totalPoints: number
  level: Difficulty
  badges: string[]
  questionsAnswered: number
  correctAnswers: number
  streak: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
}

