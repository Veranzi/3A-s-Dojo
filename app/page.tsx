'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Trophy, 
  Zap, 
  Brain, 
  Lock, 
  Award,
  ArrowRight,
  Star,
  Target,
  Play,
  Sparkles,
  TrendingUp
} from 'lucide-react'

const quickStats = [
  { value: '19+', label: 'Challenges' },
  { value: '4', label: 'Quiz Types' },
  { value: '100%', label: 'Free' },
]

const quizTypes = [
  {
    name: 'Multiple Choice',
    description: 'Select all correct answers from multiple options. Test your comprehensive knowledge!',
    icon: Brain,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    points: '10-20',
  },
  {
    name: 'Drag & Drop',
    description: 'Match items to categories by dragging. Perfect for visual learners!',
    icon: Target,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    points: '15-20',
  },
  {
    name: 'Click to Select',
    description: 'Choose the single best answer. Quick and engaging!',
    icon: Zap,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    points: '10-20',
  },
  {
    name: 'Word Puzzle',
    description: 'Discover cybersecurity terms in a Sudoku-style grid. Solve and learn!',
    icon: Star,
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    points: '25-30',
  },
]

const features = [
  {
    icon: Trophy,
    title: 'Earn Badges & Rewards',
    description: 'Unlock achievements as you progress. Show off your cyber skills!',
  },
  {
    icon: TrendingUp,
    title: 'Level Up System',
    description: 'Progress from Beginner to Expert. Track your growth in real-time.',
  },
  {
    icon: Shield,
    title: 'Real-World Scenarios',
    description: 'Learn from actual Kenyan cybersecurity and data protection cases.',
  },
  {
    icon: Star,
    title: 'Streak Tracking',
    description: 'Build your streak by answering correctly. How long can you go?',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'No sign-up needed. Your progress stays on your device.',
  },
  {
    icon: Award,
    title: 'Instant Feedback',
    description: 'Get explanations immediately. Learn from every answer.',
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: 'url(/hero.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(0.8)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-accent-600/85 to-primary-700/85"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: mounted ? 1 : 0, rotate: mounted ? 0 : -180 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative glass-effect rounded-full p-4 bg-gradient-to-br from-primary-500 to-accent-500">
                  <Shield className="w-16 h-16 text-white" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight drop-shadow-2xl"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)' }}
            >
              3A's Dojo
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: mounted ? 1 : 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white font-bold mb-2 drop-shadow-lg"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Level Up Your Cyber Defense! 🛡️
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Master cybersecurity and data protection through fun, interactive challenges. 
              Earn points, unlock badges, and become a cyber hero!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link 
                href="/quiz" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Play className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Start Playing Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="bg-white/95 backdrop-blur-sm text-primary-700 font-semibold text-base px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white/50 hover:border-white"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.5 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-lg"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Types Preview */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-800">
              Choose Your Challenge Type
            </h2>
            <p className="text-xl text-slate-600">
              Four exciting ways to learn and earn points
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quizTypes.map((type, index) => (
              <Link
                key={type.name}
                href="/quiz"
                className="group relative block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative card hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary-300">
                    <div className={`w-16 h-16 rounded-2xl ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">{type.name}</h3>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>{type.points} points per question</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Quick Access Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            <Link
              href="/quiz?type=questions"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Brain className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quiz Questions</h3>
                <p className="text-blue-100 mb-4">Test your knowledge with multiple choice, drag & drop, and click-to-select questions</p>
                <div className="flex items-center gap-2 text-blue-100 font-semibold">
                  <span>Start Quiz</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            <Link
              href="/quiz?type=sudoku"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Star className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Word Puzzles</h3>
                <p className="text-orange-100 mb-4">Discover cybersecurity terms in fun Sudoku-style word puzzles</p>
                <div className="flex items-center gap-2 text-orange-100 font-semibold">
                  <span>Start Puzzle</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-800">
              Why Players Love 3A's Dojo
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              More than just learning - it's an adventure!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group card hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Trophy className="w-24 h-24 text-yellow-300 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-lg">
              Ready to Become a Cyber Hero?
            </h2>
            <p className="text-2xl mb-10 text-primary-100 font-medium">
              Join thousands learning to protect themselves. Start your quest now!
            </p>
            <Link 
              href="/quiz" 
              className="inline-flex items-center gap-3 bg-white text-primary-600 font-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300"
            >
              <Play className="w-6 h-6" />
              Start Your Quest
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary-400" />
            <span className="text-xl font-bold">3A's Dojo</span>
          </div>
          <p className="text-slate-400 mb-4">
            Empowering Kenya with cybersecurity and data protection knowledge through gamified learning
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link href="/privacy" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">
              Data Protection & Privacy
            </Link>
            <span className="hidden sm:inline text-slate-600">•</span>
            <Link href="/about" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">
              About
            </Link>
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 3A's Dojo.
          </p>
        </div>
      </footer>
    </div>
  )
}
