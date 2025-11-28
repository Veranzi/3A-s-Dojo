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
  Users
} from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: mounted ? 1 : 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="glass-effect rounded-full p-4">
                <Shield className="w-16 h-16 text-primary-600" />
              </div>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
              RadaQuest
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-3xl mx-auto">
              Master cybersecurity through interactive challenges. Learn to protect yourself from 
              phishing, scams, and cyber threats in Kenya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/quiz" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full blur-xl"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
              Why Choose RadaQuest?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Engaging, interactive, and designed specifically for Kenyan cybersecurity challenges
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
                className="card group hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4 text-slate-800">
              Ready to Level Up Your Cybersecurity Skills?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Start your journey today. No sign-up required. Learn at your own pace.
            </p>
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
              Begin Your Quest
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary-400" />
            <span className="text-xl font-bold">RadaQuest</span>
          </div>
          <p className="text-slate-400 mb-4">
            Empowering Kenya with cybersecurity knowledge through gamified learning
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
            © 2025 RadaQuest.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: Brain,
    title: 'Interactive Learning',
    description: 'Engage with multiple quiz types: MSQ, drag-and-drop, and click-to-select challenges.',
  },
  {
    icon: Trophy,
    title: 'Gamified Experience',
    description: 'Earn points, unlock badges, and progress through beginner to expert levels.',
  },
  {
    icon: Shield,
    title: 'Kenyan Context',
    description: 'Real-world scenarios featuring M-Pesa fraud, WhatsApp scams, and local threats.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Explanations',
    description: 'Understand why answers are correct or incorrect with intelligent feedback.',
  },
  {
    icon: Lock,
    title: 'No Login Required',
    description: 'Start learning immediately. No barriers, no sign-up, completely anonymous.',
  },
  {
    icon: Award,
    title: 'Progress Tracking',
    description: 'Track your improvement with detailed progress indicators and achievements.',
  },
]

const stats = [
  { value: '3+', label: 'Quiz Types' },
  { value: '50+', label: 'Scenarios' },
  { value: '100%', label: 'Free' },
  { value: '24/7', label: 'Available' },
]

