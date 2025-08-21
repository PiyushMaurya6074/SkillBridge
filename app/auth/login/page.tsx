"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, LogIn } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [studentForm, setStudentForm] = useState({ email: "", password: "" })
  const [clientForm, setClientForm] = useState({ email: "", password: "" })

  const handleStudentLogin = () => {
    // Simple mock authentication - in real app, this would validate against a backend
    const studentData = localStorage.getItem("studentData")
    if (studentData) {
      window.location.href = "/dashboard"
    } else {
      alert("No account found. Please register first.")
    }
  }

  const handleClientLogin = () => {
    // Simple mock authentication - in real app, this would validate against a backend
    const clientData = localStorage.getItem("clientData")
    if (clientData) {
      window.location.href = "/client-dashboard"
    } else {
      alert("No account found. Please register first.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto pt-8 pb-4">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded opacity-90"></div>
          </div>
          <span className="text-xl font-bold text-white">SkillBridge</span>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your SkillBridge account</p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="student" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                <TabsTrigger value="student" className="data-[state=active]:bg-blue-500">
                  Student
                </TabsTrigger>
                <TabsTrigger value="client" className="data-[state=active]:bg-purple-500">
                  Client
                </TabsTrigger>
              </TabsList>

              {/* Student Login */}
              <TabsContent value="student" className="space-y-4">
                <div>
                  <Label htmlFor="student-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="student-email"
                    type="email"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="student-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="student-password"
                    type="password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter your password"
                  />
                </div>
                <Button onClick={handleStudentLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In as Student
                </Button>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-blue-400 hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </TabsContent>

              {/* Client Login */}
              <TabsContent value="client" className="space-y-4">
                <div>
                  <Label htmlFor="client-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="client-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="client-password"
                    type="password"
                    value={clientForm.password}
                    onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter your password"
                  />
                </div>
                <Button onClick={handleClientLogin} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In as Client
                </Button>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-blue-400 hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
