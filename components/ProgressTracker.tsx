'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Target, Zap, TrendingUp, Award } from 'lucide-react'
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
        return { 
          name: 'Beginner', 
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-500',
          icon: Star,
          gradient: 'bg-gradient-to-br from-green-400 to-emerald-500'
        }
      case 'intermediate':
        return { 
          name: 'Intermediate', 
          color: 'from-blue-500 to-cyan-600',
          bgColor: 'bg-blue-500',
          icon: Target,
          gradient: 'bg-gradient-to-br from-blue-400 to-cyan-500'
        }
      case 'expert':
        return { 
          name: 'Expert', 
          color: 'from-purple-500 to-pink-600',
          bgColor: 'bg-purple-500',
          icon: Trophy,
          gradient: 'bg-gradient-to-br from-purple-400 to-pink-500'
        }
      default:
        return { 
          name: 'Beginner', 
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-500',
          icon: Star,
          gradient: 'bg-gradient-to-br from-green-400 to-emerald-500'
        }
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
    <div className="mb-8 relative">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Points */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-yellow-200 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">{progress.totalPoints}</div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Points</p>
          </div>
        </motion.div>

        {/* Level */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
          <div className={`relative ${levelInfo.gradient} rounded-2xl p-5 shadow-xl text-white`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <LevelIcon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-black mb-1">{levelInfo.name}</div>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">Level</p>
          </div>
        </motion.div>

        {/* Accuracy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-blue-200 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">{accuracy}%</div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Accuracy</p>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-200 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-black text-slate-800 mb-1">{progress.streak}</div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Streak</p>
          </div>
        </motion.div>
      </div>

      {/* Level Progress */}
      {nextLevelPoints !== Infinity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-primary-200 shadow-lg mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <span className="font-bold text-slate-800">
                Progress to {progress.level === 'beginner' ? 'Intermediate' : 'Expert'}
              </span>
            </div>
            <span className="text-sm font-bold text-primary-600">
              {progress.totalPoints} / {nextLevelPoints} pts
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${levelInfo.color} rounded-full relative overflow-hidden`}
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Badges */}
      {progress.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 border-2 border-yellow-200 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-black text-slate-800">🏆 Earned Badges</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {progress.badges.map((badge, index) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="badge bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-2 border-yellow-600 font-bold px-4 py-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                ⭐ {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
