"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Building } from "lucide-react"
import Link from "next/link"

export default function ClientRegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
    description: "",

    // Contact Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    position: "",

    // Project Requirements
    projectTypes: [],
    budgetRange: "",
    timeline: "",
    teamSize: "",
    workStyle: "",

    // Additional Details
    experience: "",
    requirements: "",
    paymentMethod: "",
  })

  const [selectedProjectTypes, setSelectedProjectTypes] = useState([])

  const projectTypeOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "SEO Services",
    "Social Media Management",
    "Data Analysis",
    "Video Editing",
    "Photography",
    "Translation Services",
    "Virtual Assistant",
    "Business Consulting",
    "Market Research",
    "Other",
  ]

  const handleProjectTypeToggle = (type) => {
    setSelectedProjectTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Save client data and redirect to dashboard
    const clientData = {
      ...formData,
      projectTypes: selectedProjectTypes,
      registeredAt: new Date().toISOString(),
      userType: "client",
    }
    localStorage.setItem("clientData", JSON.stringify(clientData))
    window.location.href = "/client-dashboard"
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
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <Building className="h-5 w-5 text-white" />
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {step === 1 && "Company Information"}
              {step === 2 && "Contact Details"}
              {step === 3 && "Project Requirements"}
              {step === 4 && "Additional Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Company Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="text-white">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="industry" className="text-white">
                    Industry
                  </Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="non-profit">Non-Profit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companySize" className="text-white">
                    Company Size
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="website" className="text-white">
                    Company Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="https://your-company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Brief description of your company..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
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
                  <div>
                    <Label htmlFor="position" className="text-white">
                      Your Position
                    </Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., CEO, Manager, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Project Requirements */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-3 block">Types of Projects You Need Help With</Label>
                  <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {projectTypeOptions.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedProjectTypes.includes(type)}
                          onCheckedChange={() => handleProjectTypeToggle(type)}
                        />
                        <Label htmlFor={type} className="text-white text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="budgetRange" className="text-white">
                    Typical Project Budget Range
                  </Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeline" className="text-white">
                      Typical Project Timeline
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 week</SelectItem>
                        <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                        <SelectItem value="1-3-months">1-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-months+">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="teamSize" className="text-white">
                      Preferred Team Size
                    </Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual freelancer</SelectItem>
                        <SelectItem value="small-team">Small team (2-3 people)</SelectItem>
                        <SelectItem value="medium-team">Medium team (4-6 people)</SelectItem>
                        <SelectItem value="large-team">Large team (7+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="workStyle" className="text-white">
                    Preferred Work Style
                  </Label>
                  <Select
                    value={formData.workStyle}
                    onValueChange={(value) => setFormData({ ...formData, workStyle: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select work style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Fully remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid (remote + in-person)</SelectItem>
                      <SelectItem value="on-site">On-site required</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Additional Information */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="experience" className="text-white">
                    Experience Hiring Freelancers
                  </Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-time">First time hiring</SelectItem>
                      <SelectItem value="some-experience">Some experience (1-5 projects)</SelectItem>
                      <SelectItem value="experienced">Experienced (5+ projects)</SelectItem>
                      <SelectItem value="very-experienced">Very experienced (20+ projects)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="requirements" className="text-white">
                    Special Requirements or Preferences
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Any specific requirements, preferences, or additional information..."
                  />
                </div>
                <div>
                  <Label htmlFor="paymentMethod" className="text-white">
                    Preferred Payment Method
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600 text-white">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
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
