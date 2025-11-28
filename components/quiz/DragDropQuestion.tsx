'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info, GripVertical } from 'lucide-react'
import { DragDropQuestion as DragDropQuestionType } from '@/types/quiz'

interface DragDropQuestionProps {
  question: DragDropQuestionType
  onAnswer: (isCorrect: boolean, points: number) => void
}

interface ItemPlacement {
  itemId: string
  categoryId: string | null
}

export default function DragDropQuestion({ question, onAnswer }: DragDropQuestionProps) {
  const [placements, setPlacements] = useState<ItemPlacement[]>(
    question.items.map(item => ({ itemId: item.id, categoryId: null }))
  )
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDrop = (categoryId: string) => {
    const itemToPlace = draggedItem || selectedItem
    if (!itemToPlace) return

    setPlacements(prev =>
      prev.map(p => p.itemId === itemToPlace ? { ...p, categoryId } : p)
    )
    setDraggedItem(null)
    setSelectedItem(null)
  }

  const handleItemClick = (itemId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (showResult) return
    const placed = getItemPlacement(itemId) !== null
    if (placed) {
      handleRemove(itemId)
    } else {
      setSelectedItem(itemId === selectedItem ? null : itemId)
    }
  }

  const handleCategoryClick = (categoryId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (showResult) return
    if (selectedItem || draggedItem) {
      handleDrop(categoryId)
    }
  }

  const handleTouchStart = (itemId: string, e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (showResult) return
    const placed = getItemPlacement(itemId) !== null
    if (!placed) {
      setSelectedItem(itemId === selectedItem ? null : itemId)
    }
  }

  const handleRemove = (itemId: string) => {
    setPlacements(prev =>
      prev.map(p => p.itemId === itemId ? { ...p, categoryId: null } : p)
    )
  }

  const handleSubmit = () => {
    const allPlaced = placements.every(p => p.categoryId !== null)
    if (!allPlaced) return

    const correct = placements.every(placement => {
      const item = question.items.find(i => i.id === placement.itemId)
      return item?.category === placement.categoryId
    })

    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct, correct ? question.points : 0)
  }

  const getItemForPlacement = (categoryId: string) => {
    const placement = placements.find(p => p.categoryId === categoryId)
    if (!placement) return null
    return question.items.find(item => item.id === placement.itemId) || null
  }

  const getItemPlacement = (itemId: string) => {
    return placements.find(p => p.itemId === itemId)?.categoryId || null
  }

  const isItemCorrect = (itemId: string) => {
    if (!showResult) return null
    const item = question.items.find(i => i.id === itemId)
    const placement = placements.find(p => p.itemId === itemId)
    return item?.category === placement?.categoryId
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-primary-100 text-primary-700">Drag & Drop</span>
          <span className="badge bg-accent-100 text-accent-700">{question.difficulty}</span>
          <span className="badge bg-yellow-100 text-yellow-700">{question.points} pts</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{question.question}</h2>
        <p className="text-sm text-slate-500">
          <span className="hidden md:inline">Drag or </span>Tap items to select, then tap a category to match
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Items to drag */}
        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Items</h3>
          <div className="space-y-2">
            {question.items.map((item, index) => {
              const placed = getItemPlacement(item.id) !== null
              const correct = isItemCorrect(item.id)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  draggable={!showResult && !placed && typeof window !== 'undefined' && window.innerWidth > 768}
                  onDragStart={() => !showResult && !placed && handleDragStart(item.id)}
                  onClick={(e) => handleItemClick(item.id, e)}
                  onTouchStart={(e) => handleTouchStart(item.id, e)}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 transition-all touch-none ${
                    showResult
                      ? correct === true
                        ? 'bg-green-50 border-green-500'
                        : correct === false
                        ? 'bg-red-50 border-red-500'
                        : 'bg-slate-50 border-slate-200'
                      : placed
                      ? 'bg-slate-100 border-slate-300 opacity-50 cursor-default'
                      : selectedItem === item.id
                      ? 'bg-primary-200 border-primary-500 shadow-md cursor-pointer'
                      : 'bg-white border-primary-300 hover:border-primary-500 hover:shadow-md cursor-pointer'
                  } ${!showResult && !placed ? 'cursor-pointer md:cursor-move' : ''}`}
                >
                  <GripVertical className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-slate-800">{item.text}</span>
                  {placed && !showResult && (
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  )}
                  {showResult && correct === true && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                  {showResult && correct === false && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Categories to drop */}
        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Categories</h3>
          <div className="space-y-3">
            {question.categories.map((category, index) => {
              const item = getItemForPlacement(category.id)
              const isCorrectPlacement = item && item.category === category.id

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    if (!showResult) {
                      e.currentTarget.classList.add('border-primary-500', 'bg-primary-50')
                    }
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50')
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove('border-primary-500', 'bg-primary-50')
                    if (!showResult) handleDrop(category.id)
                  }}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    handleCategoryClick(category.id, e)
                  }}
                  className={`min-h-[80px] p-4 rounded-xl border-2 transition-all touch-none ${
                    showResult
                      ? isCorrectPlacement
                        ? 'bg-green-50 border-green-500'
                        : item
                        ? 'bg-red-50 border-red-500'
                        : 'bg-slate-50 border-slate-200'
                      : (selectedItem || draggedItem) && !item
                      ? 'bg-primary-50 border-primary-400 cursor-pointer'
                      : 'bg-white border-slate-200 hover:border-primary-300 cursor-pointer'
                  }`}
                >
                  <div className="font-semibold text-slate-800 mb-1">{category.name}</div>
                  <div className="text-xs text-slate-600 mb-2">{category.description}</div>
                  {item && (
                    <div className="mt-2 p-2 bg-white/80 rounded border border-slate-200">
                      <div className="text-sm font-medium text-slate-800">{item.text}</div>
                    </div>
                  )}
                  {!item && !showResult && (
                    <div className="text-xs text-slate-400 mt-2">Drop item here</div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
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
                {isCorrect ? '✓ Perfect match!' : '✗ Some matches are incorrect'}
              </p>
              <p className="text-blue-800 text-sm">{question.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={placements.some(p => p.categoryId === null)}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Submit Answer
        </button>
      )}
    </div>
  )
}

