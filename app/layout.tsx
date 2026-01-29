import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlterLabs - AI-Powered Personalized Learning Platform',
  description: 'Transform your learning journey with AI-powered personalized education. AlterLabs creates customized learning experiences tailored to Indian students, adapting to your unique pace and style.',
  keywords: 'AI learning, personalized education, Indian students, adaptive learning, EdTech, artificial intelligence, smart tutoring',
  openGraph: {
    title: 'AlterLabs - AI-Powered Personalized Learning',
    description: 'Transform your learning journey with AI-powered personalized education for Indian students.',
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
