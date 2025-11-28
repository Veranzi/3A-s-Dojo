'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Trophy, Home, Sparkles, Star, Zap, CheckCircle2, XCircle, Info, BookOpen } from 'lucide-react'
import { quizData } from '@/data/quizData'
import { Question, UserProgress, Difficulty } from '@/types/quiz'
import MSQQuestion from '@/components/quiz/MSQQuestion'
import DragDropQuestion from '@/components/quiz/DragDropQuestion'
import ClickSelectQuestion from '@/components/quiz/ClickSelectQuestion'
import SudokuQuestion from '@/components/quiz/SudokuQuestion'
import ProgressTracker from '@/components/ProgressTracker'
import { updateProgress, getInitialProgress } from '@/utils/gamification'

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress())
  const [questions, setQuestions] = useState<Question[]>([])
  const [showCompletion, setShowCompletion] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'questions' | 'sudoku'>('all')
  const [showSelection, setShowSelection] = useState(true)
  const [minimumLevel, setMinimumLevel] = useState<Difficulty | null>(null)
  const [answerHistory, setAnswerHistory] = useState<Array<{ questionId: string; isCorrect: boolean; points: number; question: Question }>>([])

  useEffect(() => {
    // Check URL parameters for pre-selected filters
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const typeParam = params.get('type')
      const difficultyParam = params.get('difficulty')
      
      if (typeParam === 'questions' || typeParam === 'sudoku') {
        setSelectedType(typeParam)
      }
      if (difficultyParam === 'beginner' || difficultyParam === 'intermediate' || difficultyParam === 'expert') {
        setSelectedDifficulty(difficultyParam)
      }
    }
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('3as-dojo-progress')
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress))
      } catch (e) {
        console.error('Failed to load progress', e)
      }
    }
  }, [])

  useEffect(() => {
    // Filter questions based on difficulty and type
    let filtered = [...quizData]
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty)
    }
    
    if (selectedType === 'questions') {
      filtered = filtered.filter(q => q.type !== 'sudoku')
    } else if (selectedType === 'sudoku') {
      filtered = filtered.filter(q => q.type === 'sudoku')
    }
    
    // Shuffle questions for variety
    const shuffled = filtered.sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
  }, [selectedDifficulty, selectedType])

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('3as-dojo-progress', JSON.stringify(progress))
  }, [progress])

  const handleAnswer = (isCorrect: boolean, points: number) => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    setLastAnswerCorrect(isCorrect)
    if (isCorrect) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }

    // Track answer in history
    setAnswerHistory(prev => [...prev, {
      questionId: currentQuestion.id,
      isCorrect,
      points,
      question: currentQuestion
    }])

    let updatedProgress = updateProgress(progress, isCorrect, points, currentQuestion)
    
    // Ensure level doesn't go below the minimum level set by selected difficulty
    if (minimumLevel) {
      const levelOrder: Difficulty[] = ['beginner', 'intermediate', 'expert']
      const currentLevelIndex = levelOrder.indexOf(updatedProgress.level)
      const minLevelIndex = levelOrder.indexOf(minimumLevel)
      
      if (currentLevelIndex < minLevelIndex) {
        updatedProgress = {
          ...updatedProgress,
          level: minimumLevel
        }
      }
    }
    
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
    setShowSelection(true)
    setMinimumLevel(null)
    setAnswerHistory([])
  }

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      alert('No questions available with selected filters. Please try different options.')
      return
    }
    
    // If a specific difficulty is selected (not 'all'), set the minimum level to that difficulty
    if (selectedDifficulty !== 'all') {
      setMinimumLevel(selectedDifficulty)
      setProgress(prev => ({
        ...prev,
        level: selectedDifficulty
      }))
    } else {
      setMinimumLevel(null)
    }
    
    // Reset answer history when starting new quiz
    setAnswerHistory([])
    setShowSelection(false)
    setCurrentQuestionIndex(0)
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progressPercent = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  // Show selection screen
  if (showSelection) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
              Choose Your Challenge
            </h1>
            <p className="text-xl text-slate-600">Select your difficulty level and challenge type</p>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Difficulty Level</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['all', 'beginner', 'intermediate', 'expert'] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white border-primary-600 shadow-lg scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-primary-300'
                  }`}
                >
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Challenge Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Challenge Type</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {(['all', 'questions', 'sudoku'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-6 rounded-xl border-2 transition-all font-semibold text-lg ${
                    selectedType === type
                      ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white border-primary-600 shadow-lg scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-primary-300'
                  }`}
                >
                  {type === 'all' ? 'All Challenges' : type === 'questions' ? 'Quiz Questions' : 'Word Puzzles'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <button
              onClick={handleStartQuiz}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white font-black text-xl px-12 py-5 rounded-xl shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all"
            >
              Start Challenge
            </button>
            <p className="text-sm text-slate-500 mt-4">
              {questions.length} question{questions.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center relative overflow-hidden"
          >
            {/* Celebration Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-primary-400/20 to-accent-400/20"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <Trophy className="w-32 h-32 text-yellow-500 relative z-10" />
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 -right-4"
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent"
              >
                🎉 Congratulations! 🎉
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-slate-600 mb-4 font-semibold"
              >
                You've completed all challenges!
              </motion.p>

              {/* Final Score - Prominent Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-2xl p-6 border-4 border-yellow-600 shadow-2xl">
                  <div className="text-center">
                    <div className="text-sm font-bold text-yellow-900 uppercase tracking-wider mb-2">Final Score</div>
                    <div className="text-7xl md:text-8xl font-black text-yellow-900 mb-2">
                      {progress.totalPoints}
                    </div>
                    <div className="text-lg font-semibold text-yellow-800">Points Earned</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl p-8 mb-8 border-2 border-primary-200"
              >
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-5xl font-black text-primary-600 mb-2">
                      {progress.totalPoints}
                    </div>
                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Points</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-accent-600 mb-2">
                      {Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)}%
                    </div>
                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-green-600 mb-2">
                      {progress.streak}
                    </div>
                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Best Streak</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-purple-600 mb-2">
                      {progress.badges.length}
                    </div>
                    <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Badges</div>
                  </div>
                </div>
              </motion.div>

              {progress.badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-black mb-4 text-slate-800">🏆 Badges Earned</h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {progress.badges.map((badge, index) => (
                      <motion.span
                        key={badge}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="badge bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-2 border-yellow-600 text-sm px-5 py-2 font-bold shadow-lg"
                      >
                        ⭐ {badge}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Solutions and Score Breakdown */}
              {answerHistory.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="mb-8 text-left"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-black text-slate-800">📚 Solutions & Score Breakdown</h2>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {answerHistory.map((answer, index) => {
                      const { question, isCorrect, points } = answer
                      return (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          className={`p-4 rounded-xl border-2 ${
                            isCorrect 
                              ? 'bg-green-50 border-green-300' 
                              : 'bg-red-50 border-red-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                              <span className="font-bold text-slate-800">
                                Question {index + 1} - {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                              </span>
                              <span className={`badge ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {isCorrect ? `+${points} pts` : '0 pts'}
                              </span>
                            </div>
                          </div>
                          
                          <p className="font-semibold text-slate-700 mb-2">{question.question}</p>
                          
                          {/* Show correct answers based on question type */}
                          <div className="mt-3 p-3 bg-white/80 rounded-lg border border-slate-200">
                            <p className="text-sm font-semibold text-slate-600 mb-2">Correct Answer:</p>
                            {question.type === 'msq' && (
                              <div className="space-y-1">
                                {question.options.filter(opt => opt.isCorrect).map((opt, i) => (
                                  <div key={opt.id} className="flex items-center gap-2 text-sm text-green-700">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>{opt.text}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type === 'click-select' && (
                              <div className="flex items-center gap-2 text-sm text-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{question.options.find(opt => opt.isCorrect)?.text}</span>
                              </div>
                            )}
                            {question.type === 'drag-drop' && (
                              <div className="space-y-1 text-sm">
                                {question.items.map(item => (
                                  <div key={item.id} className="flex items-center gap-2 text-green-700">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span><strong>{item.text}</strong> → {question.categories.find(c => c.id === item.category)?.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type === 'sudoku' && (
                              <div className="text-sm text-green-700">
                                <p className="mb-2">Words to find:</p>
                                <div className="grid grid-cols-2 gap-1">
                                  {question.terms.map(term => (
                                    <div key={term.word} className="flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span className="font-mono font-bold">{term.word}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {question.explanation && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-blue-800">{question.explanation}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white font-black text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Play Again
                </button>
                <Link
                  href="/"
                  className="bg-white text-primary-700 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-2 border-primary-200 inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <p className="text-slate-600 font-semibold">Loading challenges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </Link>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-primary-200">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-slate-800">
                Question <span className="text-primary-600">{currentQuestionIndex + 1}</span> / {questions.length}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-full h-4 shadow-lg border border-primary-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full relative overflow-hidden"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              ></motion.div>
            </motion.div>
          </div>
        </div>

        {/* Celebration Overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-8xl mb-4">🎉</div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl font-black text-primary-600"
                >
                  Correct! +{currentQuestion?.points || 0} pts
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProgressTracker progress={progress} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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
            {currentQuestion?.type === 'sudoku' && (
              <SudokuQuestion
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="bg-white text-primary-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-primary-200 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Question Dots */}
          <div className="flex gap-2 flex-wrap justify-center max-w-md">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentQuestionIndex
                    ? 'bg-primary-600 scale-125 shadow-lg'
                    : index < currentQuestionIndex
                    ? 'bg-green-500'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold px-8 py-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            {currentQuestionIndex >= questions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
