'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info } from 'lucide-react'
import { MSQQuestion as MSQQuestionType } from '@/types/quiz'

interface MSQQuestionProps {
  question: MSQQuestionType
  onAnswer: (isCorrect: boolean, points: number) => void
}

export default function MSQQuestion({ question, onAnswer }: MSQQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionToggle = (optionId: string) => {
    if (showResult) return

    const newSelected = new Set(selectedOptions)
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId)
    } else {
      newSelected.add(optionId)
    }
    setSelectedOptions(newSelected)
  }

  const handleSubmit = () => {
    if (selectedOptions.size === 0) return

    const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.id)
    const selectedArray = Array.from(selectedOptions)
    
    const allCorrectSelected = correctOptions.every(id => selectedArray.includes(id))
    const noIncorrectSelected = selectedArray.every(id => 
      question.options.find(opt => opt.id === id)?.isCorrect
    )
    
    const correct = allCorrectSelected && noIncorrectSelected && selectedArray.length === correctOptions.length
    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct, correct ? question.points : 0)
  }

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-primary-100 text-primary-700">Multiple Selection</span>
          <span className="badge bg-accent-100 text-accent-700">{question.difficulty}</span>
          <span className="badge bg-yellow-100 text-yellow-700">{question.points} pts</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{question.question}</h2>
        <p className="text-sm text-slate-500">Select all correct answers</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOptions.has(option.id)
          const showCorrect = showResult && option.isCorrect
          const showIncorrect = showResult && isSelected && !option.isCorrect

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOptionToggle(option.id)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                showResult
                  ? showCorrect
                    ? 'bg-green-50 border-green-500'
                    : showIncorrect
                    ? 'bg-red-50 border-red-500'
                    : 'bg-slate-50 border-slate-200'
                  : isSelected
                  ? 'bg-primary-50 border-primary-500 shadow-md'
                  : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-sm'
              } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  showResult
                    ? showCorrect
                      ? 'bg-green-500 border-green-600'
                      : showIncorrect
                      ? 'bg-red-500 border-red-600'
                      : 'border-slate-300'
                    : isSelected
                    ? 'bg-primary-500 border-primary-600'
                    : 'border-slate-300'
                }`}>
                  {showResult && showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {showResult && showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                  {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`font-medium ${
                  showResult
                    ? showCorrect
                      ? 'text-green-800'
                      : showIncorrect
                      ? 'text-red-800'
                      : 'text-slate-600'
                    : 'text-slate-800'
                }`}>
                  {option.text}
                </span>
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
                {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
              </p>
              <p className="text-blue-800 text-sm">{question.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedOptions.size === 0}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Submit Answer
        </button>
      )}
    </div>
  )
}

