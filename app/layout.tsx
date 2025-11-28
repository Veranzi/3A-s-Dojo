import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "3A's Dojo - Cybersecurity & Data Protection Learning",
  description: 'Master cybersecurity and data protection through interactive quizzes. Learn to safeguard your personal data and protect against cyber threats in Kenya.',
  keywords: 'cybersecurity, data protection, Kenya, gamified learning, phishing, online safety, data privacy, Kenya Data Protection Act',
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

