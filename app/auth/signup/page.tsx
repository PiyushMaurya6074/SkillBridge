"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BrainLogo } from "@/components/brain-logo"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 flex items-center justify-center p-4">
      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8">
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>

      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BrainLogo size="lg" className="text-white" />
            <span className="text-xl font-bold text-white">SkillBridge AI</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Join SkillBridge AI</h1>
          <p className="text-gray-300 text-base">Start your AI-powered career journey</p>
        </div>

        {/* User Type Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Student Card */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">I'm a Student</h2>
                <p className="text-gray-300 text-sm">Looking to develop skills and find opportunities</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">AI-powered skill assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Personalized career guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Access to paid opportunities</span>
                </div>
              </div>

              <Link href="/auth/student-register" className="block">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 text-base font-semibold rounded-xl">
                  Join as Student
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Client Card */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">I'm a Client</h2>
                <p className="text-gray-300 text-sm">Looking to hire talented students for projects</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Post project opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Access to skilled students</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Manage applications & payments</span>
                </div>
              </div>

              <Link href="/auth/client-register" className="block">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2.5 text-base font-semibold rounded-xl">
                  Join as Client
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <Link href="/auth" className="text-blue-400 hover:text-blue-300 underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
