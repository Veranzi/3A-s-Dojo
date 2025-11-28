'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Target, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              About 3A's Dojo
            </h1>
            <p className="text-xl text-slate-600">
              Empowering Kenya with cybersecurity and data protection knowledge
            </p>
          </div>

          <div className="card space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary-600" />
                Our Mission
              </h2>
              <p className="text-slate-700 leading-relaxed">
                3A's Dojo is a web-based, gamified platform designed to teach users cybersecurity and 
                data protection best practices in Kenya through interactive quizzes and challenges. We 
                believe that cybersecurity awareness and data protection knowledge should be accessible, 
                engaging, and practical for everyone, helping citizens understand their rights under the 
                Kenya Data Protection Act (2019).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-600" />
                The Problem
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Kenya is experiencing rapid digital adoption, yet human vulnerability remains the 
                leading cause of cybersecurity breaches and data protection violations. Phishing, social 
                engineering, weak passwords, malicious links, impersonation attacks, and unauthorized data 
                sharing continue to affect individuals, SMEs, and institutions. Many Kenyans are unaware 
                of their data protection rights under the Data Protection Act (2019). Traditional awareness 
                campaigns are often boring, technical, or inaccessible, leaving many citizens unprepared to 
                identify cyber threats and protect their personal data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary-600" />
                Our Solution
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                3A's Dojo offers three primary interaction formats:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Multiple-Selection Questions (MSQ):</strong> Answer scenario-based questions where multiple choices may be correct</li>
                <li><strong>Drag-and-Drop Matching:</strong> Match cybersecurity threats and data protection principles with their categories</li>
                <li><strong>Click-to-Select Questions:</strong> Choose the correct answer from multiple options</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary-600" />
                Key Features
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span><strong>Progress Levels:</strong> Beginner → Intermediate → Expert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span><strong>Badges & Rewards:</strong> Earn achievements for points, streaks, and completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span><strong>Real Kenyan Examples:</strong> Local scams, data protection scenarios, M-Pesa fraud, WhatsApp promotions, Kenya Data Protection Act compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span><strong>AI-Powered Explanations:</strong> Understand why answers are correct or incorrect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span><strong>No Login Required:</strong> Start learning immediately, completely anonymous</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <Link href="/quiz" className="btn-primary inline-flex items-center gap-2">
                Start Your Journey
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

