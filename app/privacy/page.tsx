'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'

export default function PrivacyPage() {
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
            <div className="inline-block mb-6">
              <div className="glass-effect rounded-full p-4">
                <Shield className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Data Protection & Privacy Policy
            </h1>
            <p className="text-xl text-slate-600">
              Your privacy and data protection rights
            </p>
          </div>

          <div className="card space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-600" />
                Overview
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                RadaQuest is committed to protecting your privacy and ensuring compliance with the 
                <strong> Kenya Data Protection Act (2019)</strong>. This policy explains how we handle 
                data when you use our platform.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Important:</strong> RadaQuest does not require registration, login, or collection 
                of personal information. You can use our platform completely anonymously.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary-600" />
                Data We Collect
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-slate-700 font-semibold mb-2">Minimal Data Collection:</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Progress Data (LocalStorage):</strong> Your quiz progress, points, badges, and level are stored locally in your browser. This data never leaves your device and is not transmitted to our servers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>No Personal Information:</strong> We do not collect names, email addresses, phone numbers, or any personally identifiable information.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span><strong>No Tracking:</strong> We do not use cookies, analytics trackers, or third-party tracking services.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary-600" />
                How We Use Your Data
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Since all data is stored locally in your browser:
              </p>
              <ul className="space-y-2 text-slate-700 list-disc list-inside ml-4">
                <li>Progress data is used solely to track your learning journey and display your achievements</li>
                <li>Data is not shared with third parties</li>
                <li>Data is not transmitted to any servers</li>
                <li>You have full control - you can clear your browser data at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-600" />
                Compliance with Kenya Data Protection Act (2019)
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                RadaQuest is designed to comply with the Kenya Data Protection Act (2019) principles:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Lawfulness & Fairness</h3>
                  <p className="text-sm text-green-800">We only process data that is necessary for the platform to function, stored locally on your device.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Purpose Limitation</h3>
                  <p className="text-sm text-green-800">Data is used solely for tracking your learning progress, with no other purposes.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Data Minimization</h3>
                  <p className="text-sm text-green-800">We collect the absolute minimum data necessary - only quiz progress, no personal information.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Storage Limitation</h3>
                  <p className="text-sm text-green-800">Data is stored locally in your browser. You can delete it at any time by clearing browser data.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Security</h3>
                  <p className="text-sm text-green-800">All communications use HTTPS encryption. Data never leaves your device.</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Transparency</h3>
                  <p className="text-sm text-green-800">This policy clearly explains what data we collect and how it's used.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Under the Kenya Data Protection Act, you have the right to:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Access:</strong> View your progress data stored in your browser's localStorage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Deletion:</strong> Clear your browser data at any time to delete all progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Objection:</strong> You can stop using the platform at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Portability:</strong> Your data is stored in standard browser localStorage format</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Security Measures</h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>HTTPS encryption for all communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>No server-side data storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>No third-party data sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>No tracking or analytics</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed">
                RadaQuest is designed to be safe for users of all ages. Since we do not collect personal 
                information and all data is stored locally, the platform is safe for children to use 
                without parental consent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be reflected on 
                this page with an updated date. Your continued use of the platform after changes 
                constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2 text-primary-900">Contact</h2>
              <p className="text-primary-800">
                If you have questions about this privacy policy or your data protection rights under 
                the Kenya Data Protection Act, please contact us through the platform.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">
                Last updated: January 2025
              </p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 rotate-180" />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

