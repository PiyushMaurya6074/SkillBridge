"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  User,
  BookOpen,
  LogOut,
  Star,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  Upload,
  Download,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { BrainLogo } from "@/components/brain-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumePreview, setResumePreview] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("studentData")
    if (data) {
      setStudentData(JSON.parse(data))
    }
    const resumeData = localStorage.getItem("resumeFile")
    if (resumeData) {
      setResumeFile(JSON.parse(resumeData))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("studentData")
    localStorage.removeItem("resumeFile")
    window.location.href = "/"
  }

  const handleResumeUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
      localStorage.setItem(
        "resumeFile",
        JSON.stringify({
          name: file.name,
          size: file.size,
          uploadDate: new Date().toISOString(),
        }),
      )
    }
  }

  const handleResumePreview = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile)
      window.open(url, "_blank")
    }
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 flex items-center justify-center">
        <div className="text-white text-center">
          <BrainLogo size="lg" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Welcome to SkillBridge</h1>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const mockJobs = [
    {
      id: 1,
      title: "React Developer for E-commerce Site",
      company: "TechCorp Inc.",
      budget: "$3,000 - $5,000",
      skills: ["React", "Node.js", "MongoDB"],
      match: 95,
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "UI/UX Designer for Mobile App",
      company: "StartupXYZ",
      budget: "$2,000 - $3,500",
      skills: ["Figma", "UI Design", "Prototyping"],
      match: 87,
      posted: "1 week ago",
    },
  ]

  const learningModules = [
    { title: "Advanced React Patterns", progress: 75, duration: "4 hours" },
    { title: "Node.js Backend Development", progress: 45, duration: "6 hours" },
    { title: "Database Design Fundamentals", progress: 20, duration: "3 hours" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrainLogo size="md" />
              <div>
                <h1 className="text-xl font-bold text-white">Welcome back, {studentData.firstName}!</h1>
                <p className="text-gray-300 text-sm">Ready to grow your skills today?</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/dashboard/profile">
                <Button variant="outline" className="border-gray-600 text-white bg-transparent hover:bg-gray-700">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-red-600 text-red-400 bg-transparent hover:bg-red-600 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Skill Level</p>
                  <p className="text-2xl font-bold text-white">{studentData.experience || "Intermediate"}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed Projects</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Earnings</p>
                  <p className="text-2xl font-bold text-white">$2,450</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">98%</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList className="bg-gray-800/50 border-gray-700">
            <TabsTrigger value="matches" className="data-[state=active]:bg-blue-500">
              Job Matches
            </TabsTrigger>
            <TabsTrigger value="learning" className="data-[state=active]:bg-blue-500">
              Learning
            </TabsTrigger>
            <TabsTrigger value="resume" className="data-[state=active]:bg-blue-500">
              Resume
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-blue-500">
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Job Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recommended Jobs</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">View All Jobs</Button>
            </div>

            <div className="grid gap-6">
              {mockJobs.map((job) => (
                <Card key={job.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-300 mb-3">{job.company}</p>
                        <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                          <span>{job.budget}</span>
                          <span>•</span>
                          <span>Posted {job.posted}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-400 font-bold text-lg">{job.match}%</span>
                          <span className="text-gray-300 text-sm">match</span>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Learning Path</h2>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </div>

            {studentData.assessmentResults && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Recommended for {studentData.assessmentResults.recommendations.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningModules.map((module, index) => (
                    <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{module.title}</h3>
                        <span className="text-gray-300 text-sm">{module.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={module.progress} className="flex-1" />
                        <span className="text-white text-sm font-medium">{module.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Resume Management</h2>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Upload Your Resume</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resume" className="text-white">
                          Choose PDF file
                        </Label>
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf"
                          onChange={handleResumeUpload}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      {resumeFile && (
                        <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                          <p className="text-green-400 text-sm">✓ Resume uploaded successfully: {resumeFile.name}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{resumeFile ? resumeFile.name : "My_Resume.pdf"}</h3>
                      <p className="text-gray-300 text-sm">
                        {resumeFile
                          ? `Uploaded just now • ${Math.round(resumeFile.size / 1024)} KB`
                          : "Uploaded 2 days ago • 245 KB"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-white bg-transparent"
                      onClick={handleResumePreview}
                      disabled={!resumeFile}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-green-400 text-sm">
                    ✓ Your resume has been successfully uploaded and is visible to potential clients.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
              <p className="text-gray-300">Apply to jobs to start conversations with clients.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
