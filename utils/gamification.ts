import { UserProgress, Question } from '@/types/quiz'

export function calculateLevel(totalPoints: number): 'beginner' | 'intermediate' | 'expert' {
  if (totalPoints >= 250) return 'expert'
  if (totalPoints >= 100) return 'intermediate'
  return 'beginner'
}

export function checkBadges(progress: UserProgress, question: Question): string[] {
  const newBadges: string[] = []

  // First Question Badge
  if (progress.questionsAnswered === 1 && !progress.badges.includes('First Steps')) {
    newBadges.push('First Steps')
  }

  // Perfect Score Badge
  if (progress.questionsAnswered >= 5 && progress.correctAnswers === progress.questionsAnswered && !progress.badges.includes('Perfect Score')) {
    newBadges.push('Perfect Score')
  }

  // Streak Badges
  if (progress.streak === 5 && !progress.badges.includes('Hot Streak')) {
    newBadges.push('Hot Streak')
  }
  if (progress.streak === 10 && !progress.badges.includes('On Fire')) {
    newBadges.push('On Fire')
  }

  // Points Badges
  if (progress.totalPoints >= 50 && !progress.badges.includes('Point Collector')) {
    newBadges.push('Point Collector')
  }
  if (progress.totalPoints >= 150 && !progress.badges.includes('Point Master')) {
    newBadges.push('Point Master')
  }
  if (progress.totalPoints >= 300 && !progress.badges.includes('Point Legend')) {
    newBadges.push('Point Legend')
  }

  // Level Badges
  if (progress.level === 'intermediate' && !progress.badges.includes('Level Up')) {
    newBadges.push('Level Up')
  }
  if (progress.level === 'expert' && !progress.badges.includes('Cyber Expert')) {
    newBadges.push('Cyber Expert')
  }

  // Question Type Badges
  if (question.type === 'msq' && !progress.badges.includes('Multi-Selector')) {
    newBadges.push('Multi-Selector')
  }
  if (question.type === 'drag-drop' && !progress.badges.includes('Drag Master')) {
    newBadges.push('Drag Master')
  }

  return newBadges
}

export function updateProgress(
  currentProgress: UserProgress,
  isCorrect: boolean,
  points: number,
  question: Question
): UserProgress {
  const newTotalPoints = currentProgress.totalPoints + points
  const newLevel = calculateLevel(newTotalPoints)
  const newQuestionsAnswered = currentProgress.questionsAnswered + 1
  const newCorrectAnswers = currentProgress.correctAnswers + (isCorrect ? 1 : 0)
  const newStreak = isCorrect ? currentProgress.streak + 1 : 0

  const updatedProgress: UserProgress = {
    totalPoints: newTotalPoints,
    level: newLevel,
    badges: [...currentProgress.badges],
    questionsAnswered: newQuestionsAnswered,
    correctAnswers: newCorrectAnswers,
    streak: newStreak,
  }

  const newBadges = checkBadges(updatedProgress, question)
  updatedProgress.badges = [...updatedProgress.badges, ...newBadges]

  return updatedProgress
}

export function getInitialProgress(): UserProgress {
  return {
    totalPoints: 0,
    level: 'beginner',
    badges: [],
    questionsAnswered: 0,
    correctAnswers: 0,
    streak: 0,
  }
}

