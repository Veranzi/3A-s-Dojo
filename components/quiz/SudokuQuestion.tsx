'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info, Lightbulb } from 'lucide-react'
import { SudokuQuestion as SudokuQuestionType } from '@/types/quiz'

interface SudokuQuestionProps {
  question: SudokuQuestionType
  onAnswer: (isCorrect: boolean, points: number) => void
}

export default function SudokuQuestion({ question, onAnswer }: SudokuQuestionProps) {
  const [grid, setGrid] = useState<(string | null)[][]>(
    question.grid.map(row => [...row])
  )
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)

  const handleCellClick = (row: number, col: number) => {
    if (showResult) return
    if (question.grid[row][col] !== null) return // Can't edit pre-filled cells
    setSelectedCell({ row, col })
  }

  const handleKeyPress = (key: string) => {
    if (!selectedCell || showResult) return
    if (key === 'Backspace' || key === 'Delete' || key === '') {
      const newGrid = grid.map(r => [...r])
      newGrid[selectedCell.row][selectedCell.col] = null
      setGrid(newGrid)
      return
    }
    
    // Only allow letters
    if (key.length === 1 && /[A-Za-z]/.test(key)) {
      const newGrid = grid.map(r => [...r])
      newGrid[selectedCell.row][selectedCell.col] = key.toUpperCase()
      setGrid(newGrid)
      
      // Move to next empty cell
      const nextCell = findNextEmptyCell(selectedCell.row, selectedCell.col)
      if (nextCell) {
        setSelectedCell(nextCell)
      }
    }
  }

  const findNextEmptyCell = (startRow: number, startCol: number): { row: number; col: number } | null => {
    for (let row = startRow; row < grid.length; row++) {
      for (let col = row === startRow ? startCol + 1 : 0; col < grid[row].length; col++) {
        if (question.grid[row][col] === null && grid[row][col] === null) {
          return { row, col }
        }
      }
    }
    return null
  }

  const handleSubmit = () => {
    // Check if all filled cells match the solution (ignore null cells in solution)
    const correct = grid.every((row, i) =>
      row.every((cell, j) => {
        const solutionCell = question.solution[i][j]
        // If solution has a value, user's cell must match
        if (solutionCell !== null) {
          return cell === solutionCell
        }
        // If solution is null, user's cell should also be null (or we don't care)
        return true
      })
    )

    setIsCorrect(correct)
    setShowResult(true)
    onAnswer(correct, correct ? question.points : 0)
  }

  const handleShowHint = () => {
    if (hintIndex < question.hints.length) {
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
      setHintIndex(prev => Math.min(prev + 1, question.hints.length - 1))
    }
  }

  const isCellInTerm = (row: number, col: number) => {
    return question.terms.some(term => {
      if (term.position.direction === 'across') {
        return term.position.row === row && 
               col >= term.position.col && 
               col < term.position.col + term.word.length
      } else {
        return term.position.col === col && 
               row >= term.position.row && 
               row < term.position.row + term.word.length
      }
    })
  }

  const getTermForCell = (row: number, col: number) => {
    return question.terms.find(term => {
      if (term.position.direction === 'across') {
        return term.position.row === row && 
               col >= term.position.col && 
               col < term.position.col + term.word.length
      } else {
        return term.position.col === col && 
               row >= term.position.row && 
               row < term.position.row + term.word.length
      }
    })
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge bg-primary-100 text-primary-700">Word Puzzle</span>
          <span className="badge bg-accent-100 text-accent-700">{question.difficulty}</span>
          <span className="badge bg-yellow-100 text-yellow-700">{question.points} pts</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{question.question}</h2>
        <p className="text-sm text-slate-500">Fill in the grid to discover cybersecurity terms</p>
      </div>

      {/* Terms to Find */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-slate-800 mb-3">Terms to Discover:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {question.terms.map((term, index) => {
            const isFound = term.position.direction === 'across'
              ? grid[term.position.row]?.slice(term.position.col, term.position.col + term.word.length)
                  .every((cell, i) => cell === term.word[i])
              : term.word.split('').every((char, i) => grid[term.position.row + i]?.[term.position.col] === char)
            
            return (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  isFound ? 'bg-green-100 border border-green-300' : 'bg-white border border-blue-200'
                }`}
              >
                {isFound && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />}
                <div className="flex-1">
                  <div className="font-medium text-slate-800">{term.clue}</div>
                  <div className="text-xs text-slate-600">
                    {term.position.direction === 'across' ? '→' : '↓'} {term.word.length} letters
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="mb-6">
        <div
          className="inline-grid gap-0 border-2 border-slate-800 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
          }}
          onKeyDown={(e) => handleKeyPress(e.key)}
          tabIndex={0}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isPreFilled = question.grid[rowIndex][colIndex] !== null
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
              const isInTerm = isCellInTerm(rowIndex, colIndex)
              const solutionCell = question.solution[rowIndex][colIndex]
              const isCorrectCell = showResult && solutionCell !== null && cell === solutionCell
              const isWrongCell = showResult && solutionCell !== null && cell !== solutionCell && cell !== null
              const term = getTermForCell(rowIndex, colIndex)

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    w-12 h-12 border border-slate-300 flex items-center justify-center
                    font-bold text-lg cursor-pointer transition-all
                    ${isPreFilled ? 'bg-slate-200 text-slate-600' : 'bg-white hover:bg-blue-50'}
                    ${isSelected ? 'ring-4 ring-primary-400 bg-primary-50' : ''}
                    ${isInTerm ? 'bg-blue-50' : ''}
                    ${showResult && isCorrectCell ? 'bg-green-100 text-green-800' : ''}
                    ${showResult && isWrongCell ? 'bg-red-100 text-red-800' : ''}
                    ${(rowIndex + 1) % 3 === 0 && rowIndex < grid.length - 1 ? 'border-b-2 border-slate-600' : ''}
                    ${(colIndex + 1) % 3 === 0 && colIndex < row.length - 1 ? 'border-r-2 border-slate-600' : ''}
                  `}
                >
                  {cell || ''}
                </div>
              )
            })
          )}
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center">
          Click a cell and type a letter to fill it in
        </p>
      </div>

      {/* Hint Button */}
      {!showResult && question.hints.length > 0 && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleShowHint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
          >
            <Lightbulb className="w-4 h-4" />
            Show Hint ({hintIndex + 1}/{question.hints.length})
          </button>
        </div>
      )}

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl"
        >
          <p className="text-yellow-800 font-medium">{question.hints[hintIndex]}</p>
        </motion.div>
      )}

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
                {isCorrect ? '✓ Perfect! All terms discovered!' : '✗ Some terms are incorrect'}
              </p>
              <p className="text-blue-800 text-sm">{question.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          className="btn-primary w-full"
        >
          Submit Answer
        </button>
      )}
    </div>
  )
}

