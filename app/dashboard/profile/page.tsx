"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [studentData, setStudentData] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("studentData")
    if (data) {
      const parsed = JSON.parse(data)
      setStudentData(parsed)
      setFormData(parsed)
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem("studentData", JSON.stringify(formData))
    setStudentData(formData)
    setIsSaving(false)

    // Show success message
    alert("Profile updated successfully!")
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Profile...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Complete Profile</span>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Personal Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName || ""}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age" className="text-white">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="text-white">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience" className="text-white">
                  Experience Level
                </Label>
                <Select
                  value={formData.experience || ""}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="portfolio" className="text-white">
                  Portfolio/Website
                </Label>
                <Input
                  id="portfolio"
                  value={formData.portfolio || ""}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://your-portfolio.com"
                />
              </div>
              <div>
                <Label htmlFor="expectedSalary" className="text-white">
                  Expected Hourly Rate ($)
                </Label>
                <Input
                  id="expectedSalary"
                  type="number"
                  value={formData.expectedSalary || ""}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="careerGoals" className="text-white">
                  Career Goals
                </Label>
                <Textarea
                  id="careerGoals"
                  value={formData.careerGoals || ""}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Describe your career aspirations..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Assessment Results */}
          {studentData.assessmentResults && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-400 font-semibold mb-2">
                    Your Career Path: {studentData.assessmentResults.recommendations.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{studentData.assessmentResults.recommendations.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
