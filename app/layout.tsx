import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RadaQuest - Gamified Cybersecurity Awareness',
  description: 'Learn cybersecurity through interactive quizzes and challenges. Protect yourself from phishing, scams, and cyber threats in Kenya.',
  keywords: 'cybersecurity, Kenya, gamified learning, phishing, online safety',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

