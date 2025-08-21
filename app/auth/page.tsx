"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BrainLogo } from "@/components/brain-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BrainLogo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold">SkillBridge AI</CardTitle>
          <CardDescription>Start your AI-powered career journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center text-sm">
                  <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">Choose your account type to get started</p>
                <div className="grid gap-4">
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full h-auto p-4 bg-transparent">
                      <div className="text-left">
                        <div className="font-semibold">I'm a Student</div>
                        <div className="text-sm text-muted-foreground">
                          Looking to develop skills and find opportunities
                        </div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full h-auto p-4 bg-transparent">
                      <div className="text-left">
                        <div className="font-semibold">I'm a Client</div>
                        <div className="text-sm text-muted-foreground">
                          Looking to hire talented students for projects
                        </div>
                      </div>
                    </Button>
                  </Link>
                </div>
                <div className="text-center text-sm mt-4">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <button
                    onClick={() => {
                      const signinTab = document.querySelector('[value="signin"]') as HTMLElement
                      signinTab?.click()
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
