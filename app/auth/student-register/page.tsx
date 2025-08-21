"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StudentRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    location: "",

    // Education
    education: "",
    institution: "",
    graduationYear: "",
    gpa: "",

    // Skills & Experience
    skills: [],
    experience: "",
    portfolio: "",

    // Career Goals
    careerGoals: "",
    preferredIndustry: "",
    expectedSalary: "",
    availability: "",
  })

  const [selectedSkills, setSelectedSkills] = useState([])

  const skillOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
    "Photography",
    "Social Media Management",
    "SEO",
    "Project Management",
    "Business Analysis",
    "Accounting",
    "Translation",
  ]

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Save form data and redirect to assessment
    localStorage.setItem("studentData", JSON.stringify({ ...formData, skills: selectedSkills }))
    window.location.href = "/auth/assessment"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto pt-8 pb-4">
        <Link href="/auth/signup">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded opacity-90"></div>
          </div>
          <span className="text-xl font-bold text-white">SkillBridge</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Step {step} of 4</span>
            <span className="text-white text-sm">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {step === 1 && "Personal Information"}
              {step === 2 && "Education Background"}
              {step === 3 && "Skills & Experience"}
              {step === 4 && "Career Goals"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
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
                      value={formData.lastName}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                      value={formData.age}
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
                      value={formData.phone}
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
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="education" className="text-white">
                    Education Level
                  </Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => setFormData({ ...formData, education: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="bootcamp">Bootcamp/Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="institution" className="text-white">
                    Institution
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="graduationYear" className="text-white">
                      Graduation Year
                    </Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa" className="text-white">
                      GPA (Optional)
                    </Label>
                    <Input
                      id="gpa"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Experience */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-3 block">Select Your Skills</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-white text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience" className="text-white">
                    Experience Level
                  </Label>
                  <Select
                    value={formData.experience}
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
                    Portfolio/Website (Optional)
                  </Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Career Goals */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="careerGoals" className="text-white">
                    Career Goals
                  </Label>
                  <Textarea
                    id="careerGoals"
                    value={formData.careerGoals}
                    onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Describe your career aspirations..."
                  />
                </div>
                <div>
                  <Label htmlFor="preferredIndustry" className="text-white">
                    Preferred Industry
                  </Label>
                  <Select
                    value={formData.preferredIndustry}
                    onValueChange={(value) => setFormData({ ...formData, preferredIndustry: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select preferred industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedSalary" className="text-white">
                      Expected Hourly Rate ($)
                    </Label>
                    <Input
                      id="expectedSalary"
                      type="number"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability" className="text-white">
                      Availability
                    </Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) => setFormData({ ...formData, availability: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevious}
                disabled={step === 1}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 bg-transparent"
              >
                Previous
              </Button>

              {step < 4 ? (
                <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  Complete Registration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
