'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info } from 'lucide-react'
import { ClickSelectQuestion as ClickSelectQuestionType } from '@/types/quiz'

interface ClickSelectQuestionProps {
  question: ClickSelectQuestionType
  onAnswer: (isCorrect: boolean, points: number) => void
}

export default function ClickSelectQuestion({ question, onAnswer }: ClickSelectQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionClick = (optionId: string) => {
    if (showResult) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    const selected = question.options.find(opt => opt.id === selectedOption)
    const correct = selected?.isCorrect || false

    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct, correct ? question.points : 0)
  }

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-primary-100 text-primary-700">Click to Select</span>
          <span className="badge bg-accent-100 text-accent-700">{question.difficulty}</span>
          <span className="badge bg-yellow-100 text-yellow-700">{question.points} pts</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{question.question}</h2>
        <p className="text-sm text-slate-500">Select the correct answer</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option.id
          const showAsCorrect = showResult && option.isCorrect
          const showAsIncorrect = showResult && isSelected && !option.isCorrect

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOptionClick(option.id)}
              disabled={showResult}
              className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                showResult
                  ? showAsCorrect
                    ? 'bg-green-50 border-green-500 shadow-lg'
                    : showAsIncorrect
                    ? 'bg-red-50 border-red-500'
                    : 'bg-slate-50 border-slate-200'
                  : isSelected
                  ? 'bg-primary-50 border-primary-500 shadow-md scale-105'
                  : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-sm'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold ${
                  showResult
                    ? showAsCorrect
                      ? 'bg-green-500 border-green-600 text-white'
                      : showAsIncorrect
                      ? 'bg-red-500 border-red-600 text-white'
                      : 'border-slate-300 text-slate-400'
                    : isSelected
                    ? 'bg-primary-500 border-primary-600 text-white'
                    : 'border-slate-300 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-lg font-medium flex-1 ${
                  showResult
                    ? showAsCorrect
                      ? 'text-green-800'
                      : showAsIncorrect
                      ? 'text-red-800'
                      : 'text-slate-600'
                    : 'text-slate-800'
                }`}>
                  {option.text}
                </span>
                {showResult && showAsCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
                {showResult && showAsIncorrect && (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-200"
        >
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-blue-800 text-sm">{question.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Submit Answer
        </button>
      )}
    </div>
  )
}

