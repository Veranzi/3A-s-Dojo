'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Target, Zap } from 'lucide-react'
import { UserProgress } from '@/types/quiz'

interface ProgressTrackerProps {
  progress: UserProgress
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  const accuracy = progress.questionsAnswered > 0
    ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
    : 0

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'beginner':
        return { name: 'Beginner', color: 'bg-green-500', icon: Star }
      case 'intermediate':
        return { name: 'Intermediate', color: 'bg-blue-500', icon: Target }
      case 'expert':
        return { name: 'Expert', color: 'bg-purple-500', icon: Trophy }
      default:
        return { name: 'Beginner', color: 'bg-green-500', icon: Star }
    }
  }

  const levelInfo = getLevelInfo(progress.level)
  const LevelIcon = levelInfo.icon

  const getNextLevelPoints = () => {
    switch (progress.level) {
      case 'beginner':
        return 100
      case 'intermediate':
        return 250
      case 'expert':
        return Infinity
      default:
        return 100
    }
  }

  const nextLevelPoints = getNextLevelPoints()
  const progressToNext = nextLevelPoints !== Infinity
    ? Math.min((progress.totalPoints / nextLevelPoints) * 100, 100)
    : 100

  return (
    <div className="card mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-2xl font-bold text-slate-800">{progress.totalPoints}</span>
          </div>
          <p className="text-sm text-slate-600">Total Points</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <LevelIcon className={`w-5 h-5 ${levelInfo.color.replace('bg-', 'text-')}`} />
            <span className="text-lg font-bold text-slate-800">{levelInfo.name}</span>
          </div>
          <p className="text-sm text-slate-600">Current Level</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-bold text-slate-800">{accuracy}%</span>
          </div>
          <p className="text-sm text-slate-600">Accuracy</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="text-2xl font-bold text-slate-800">{progress.streak}</span>
          </div>
          <p className="text-sm text-slate-600">Streak</p>
        </div>
      </div>

      {nextLevelPoints !== Infinity && (
        <div>
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Progress to {progress.level === 'beginner' ? 'Intermediate' : 'Expert'}</span>
            <span>{progress.totalPoints} / {nextLevelPoints} pts</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${levelInfo.color} rounded-full`}
            />
          </div>
        </div>
      )}

      {progress.badges.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-3">Earned Badges</p>
          <div className="flex flex-wrap gap-2">
            {progress.badges.map((badge) => (
              <span
                key={badge}
                className="badge bg-yellow-100 text-yellow-700 border border-yellow-300"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

