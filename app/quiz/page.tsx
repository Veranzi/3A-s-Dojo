'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Trophy, Home } from 'lucide-react'
import { quizData } from '@/data/quizData'
import { Question, UserProgress } from '@/types/quiz'
import MSQQuestion from '@/components/quiz/MSQQuestion'
import DragDropQuestion from '@/components/quiz/DragDropQuestion'
import ClickSelectQuestion from '@/components/quiz/ClickSelectQuestion'
import ProgressTracker from '@/components/ProgressTracker'
import { updateProgress, getInitialProgress } from '@/utils/gamification'

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress())
  const [questions, setQuestions] = useState<Question[]>([])
  const [showCompletion, setShowCompletion] = useState(false)

  useEffect(() => {
    // Shuffle questions for variety
    const shuffled = [...quizData].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('radaquest-progress')
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress))
      } catch (e) {
        console.error('Failed to load progress', e)
      }
    }
  }, [])

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('radaquest-progress', JSON.stringify(progress))
  }, [progress])

  const handleAnswer = (isCorrect: boolean, points: number) => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    const updatedProgress = updateProgress(progress, isCorrect, points, currentQuestion)
    setProgress(updatedProgress)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowCompletion(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setProgress(getInitialProgress())
    setShowCompletion(false)
    const shuffled = [...quizData].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (showCompletion) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Trophy className="w-24 h-24 text-yellow-500" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Congratulations! 🎉
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              You've completed all questions!
            </p>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {progress.totalPoints}
                  </div>
                  <div className="text-sm text-slate-600">Total Points</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-1">
                    {Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)}%
                  </div>
                  <div className="text-sm text-slate-600">Accuracy</div>
                </div>
              </div>
            </div>

            {progress.badges.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Badges Earned</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {progress.badges.map((badge) => (
                    <span
                      key={badge}
                      className="badge bg-yellow-100 text-yellow-700 border border-yellow-300 text-sm px-4 py-2"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleRestart} className="btn-primary">
                Try Again
              </button>
              <Link href="/" className="btn-secondary inline-flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-sm text-slate-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        <ProgressTracker progress={progress} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion?.type === 'msq' && (
              <MSQQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion?.type === 'drag-drop' && (
              <DragDropQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
            {currentQuestion?.type === 'click-select' && (
              <ClickSelectQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestionIndex
                    ? 'bg-primary-600'
                    : index < currentQuestionIndex
                    ? 'bg-green-500'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex >= questions.length - 1}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

