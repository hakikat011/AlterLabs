import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlterLabs - AI-Powered Personalized Learning Platform',
  description: 'Transform your learning journey with personalized AI that goes beyond standard curriculum metrics. AlterLabs tracks your performance, passions, and interests with advanced analytics and indexed knowledge systems—tailored for Indian students.',
  keywords: 'AI learning, personalized education, Indian students, adaptive learning, EdTech, artificial intelligence, smart tutoring, performance analytics, passion-driven learning, indexed knowledge',
  openGraph: {
    title: 'AlterLabs - AI-Powered Personalized Learning',
    description: 'Experience personalized AI that advances your individual learning journey with advanced analytics and passion-driven content.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
