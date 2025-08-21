"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { BrainLogo } from "@/components/brain-logo"

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? "dark" : ""}`}>
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
        >
          {isDark ? <Sun className="h-4 w-4 text-white" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Login Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/auth/login">
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
          >
            Sign In
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 dark:from-black dark:via-gray-900 dark:to-orange-900 bg-white">
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex items-center gap-3">
            <BrainLogo size="lg" className="text-white" />
            <span className="text-xl font-bold text-white dark:text-white text-gray-900">SkillBridge AI</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen px-4 pt-20">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Your journey to skills, growth, and earnings starts here
              </span>
              <span className="ml-3 text-3xl md:text-4xl">🚀</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-300 dark:text-gray-300 text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Bridge the gap between your potential and success. Our AI analyzes your skills, guides your growth, and
              connects you with paid opportunities that match your abilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 text-base font-semibold rounded-xl bg-transparent backdrop-blur-sm transition-all duration-300"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <BrainLogo size="md" className="mx-auto mb-3 text-blue-400" />
                <h3 className="text-white font-semibold mb-2 text-sm">AI-Powered Assessment</h3>
                <p className="text-gray-300 text-xs">Discover your strengths and growth areas</p>
              </div>

              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-lg">📈</span>
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">Personalized Growth</h3>
                <p className="text-gray-300 text-xs">Tailored learning paths for your goals</p>
              </div>

              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-lg">💼</span>
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">Paid Opportunities</h3>
                <p className="text-gray-300 text-xs">Connect with clients seeking your skills</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}
