"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const assessmentQuestions = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: [
      { value: "remote", label: "Remote/Work from home", weight: { tech: 3, creative: 2, business: 1 } },
      { value: "office", label: "Traditional office setting", weight: { tech: 1, creative: 1, business: 3 } },
      { value: "hybrid", label: "Mix of remote and office", weight: { tech: 2, creative: 2, business: 2 } },
      { value: "field", label: "On-site/Field work", weight: { tech: 1, creative: 1, business: 2 } },
    ],
  },
  {
    id: 2,
    question: "Which activity sounds most appealing to you?",
    options: [
      {
        value: "coding",
        label: "Writing code and building applications",
        weight: { tech: 4, creative: 1, business: 1 },
      },
      {
        value: "designing",
        label: "Creating visual designs and user experiences",
        weight: { tech: 2, creative: 4, business: 1 },
      },
      {
        value: "analyzing",
        label: "Analyzing data and solving business problems",
        weight: { tech: 2, creative: 1, business: 4 },
      },
      {
        value: "communicating",
        label: "Communicating with clients and managing projects",
        weight: { tech: 1, creative: 2, business: 3 },
      },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to learn new skills?",
    options: [
      {
        value: "hands-on",
        label: "Hands-on practice and experimentation",
        weight: { tech: 3, creative: 3, business: 2 },
      },
      { value: "structured", label: "Structured courses and tutorials", weight: { tech: 2, creative: 2, business: 3 } },
      { value: "mentorship", label: "Learning from mentors and peers", weight: { tech: 2, creative: 2, business: 3 } },
      {
        value: "self-directed",
        label: "Self-directed research and exploration",
        weight: { tech: 3, creative: 3, business: 2 },
      },
    ],
  },
  {
    id: 4,
    question: "What motivates you most in your work?",
    options: [
      {
        value: "problem-solving",
        label: "Solving complex technical problems",
        weight: { tech: 4, creative: 2, business: 2 },
      },
      {
        value: "creativity",
        label: "Expressing creativity and artistic vision",
        weight: { tech: 1, creative: 4, business: 1 },
      },
      {
        value: "impact",
        label: "Making a positive impact on business/society",
        weight: { tech: 2, creative: 2, business: 3 },
      },
      { value: "growth", label: "Personal and professional growth", weight: { tech: 2, creative: 2, business: 3 } },
    ],
  },
  {
    id: 5,
    question: "Which tools/technologies interest you most?",
    options: [
      {
        value: "programming",
        label: "Programming languages and frameworks",
        weight: { tech: 4, creative: 1, business: 1 },
      },
      {
        value: "design-tools",
        label: "Design software and creative tools",
        weight: { tech: 1, creative: 4, business: 1 },
      },
      {
        value: "analytics",
        label: "Data analysis and business intelligence tools",
        weight: { tech: 2, creative: 1, business: 4 },
      },
      {
        value: "communication",
        label: "Communication and project management tools",
        weight: { tech: 1, creative: 2, business: 3 },
      },
    ],
  },
  {
    id: 6,
    question: "How do you handle deadlines and pressure?",
    options: [
      {
        value: "systematic",
        label: "I work systematically and plan ahead",
        weight: { tech: 3, creative: 2, business: 3 },
      },
      {
        value: "creative-bursts",
        label: "I work best in creative bursts",
        weight: { tech: 2, creative: 3, business: 1 },
      },
      {
        value: "collaborative",
        label: "I prefer collaborative problem-solving",
        weight: { tech: 2, creative: 2, business: 3 },
      },
      {
        value: "independent",
        label: "I work independently and focus deeply",
        weight: { tech: 3, creative: 3, business: 2 },
      },
    ],
  },
  {
    id: 7,
    question: "What type of projects excite you most?",
    options: [
      {
        value: "technical",
        label: "Building technical solutions and systems",
        weight: { tech: 4, creative: 1, business: 2 },
      },
      {
        value: "creative",
        label: "Creating visual content and experiences",
        weight: { tech: 1, creative: 4, business: 1 },
      },
      {
        value: "strategic",
        label: "Developing business strategies and processes",
        weight: { tech: 1, creative: 1, business: 4 },
      },
      {
        value: "mixed",
        label: "Projects that combine multiple disciplines",
        weight: { tech: 2, creative: 2, business: 2 },
      },
    ],
  },
  {
    id: 8,
    question: "How do you prefer to communicate your ideas?",
    options: [
      {
        value: "documentation",
        label: "Through detailed documentation and code",
        weight: { tech: 4, creative: 1, business: 2 },
      },
      {
        value: "visual",
        label: "Through visual presentations and mockups",
        weight: { tech: 1, creative: 4, business: 2 },
      },
      {
        value: "verbal",
        label: "Through meetings and verbal discussions",
        weight: { tech: 1, creative: 2, business: 4 },
      },
      {
        value: "prototypes",
        label: "Through working prototypes and demos",
        weight: { tech: 3, creative: 3, business: 2 },
      },
    ],
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const calculateResults = () => {
    const scores = { tech: 0, creative: 0, business: 0 }

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions.find((q) => q.id === Number.parseInt(questionId))
      const selectedOption = question.options.find((opt) => opt.value === answer)

      if (selectedOption) {
        scores.tech += selectedOption.weight.tech
        scores.creative += selectedOption.weight.creative
        scores.business += selectedOption.weight.business
      }
    })

    const maxScore = Math.max(scores.tech, scores.creative, scores.business)
    let primaryPath = "tech"
    if (scores.creative === maxScore) primaryPath = "creative"
    else if (scores.business === maxScore) primaryPath = "business"

    return {
      scores,
      primaryPath,
      recommendations: getRecommendations(primaryPath, scores),
    }
  }

  const getRecommendations = (primaryPath, scores) => {
    const recommendations = {
      tech: {
        title: "Technology & Engineering",
        description: "You have a strong aptitude for technical problem-solving and building digital solutions.",
        careers: [
          "Software Developer",
          "Web Developer",
          "Data Scientist",
          "DevOps Engineer",
          "Mobile App Developer",
          "AI/ML Engineer",
        ],
        skills: [
          "Programming Languages (Python, JavaScript, Java)",
          "Web Development (React, Node.js)",
          "Database Management",
          "Cloud Computing (AWS, Azure)",
          "Version Control (Git)",
          "API Development",
        ],
        learningPath: [
          "Start with fundamental programming concepts",
          "Choose a specialization (Web, Mobile, Data, etc.)",
          "Build portfolio projects",
          "Learn industry-standard tools and frameworks",
          "Contribute to open-source projects",
          "Stay updated with latest technologies",
        ],
      },
      creative: {
        title: "Creative & Design",
        description: "You excel at visual communication and creating engaging user experiences.",
        careers: [
          "UI/UX Designer",
          "Graphic Designer",
          "Web Designer",
          "Brand Designer",
          "Content Creator",
          "Digital Marketing Specialist",
        ],
        skills: [
          "Design Software (Figma, Adobe Creative Suite)",
          "User Experience (UX) Design",
          "User Interface (UI) Design",
          "Brand Identity Design",
          "Typography and Color Theory",
          "Prototyping and Wireframing",
        ],
        learningPath: [
          "Master design fundamentals and principles",
          "Learn industry-standard design tools",
          "Study user psychology and behavior",
          "Build a diverse design portfolio",
          "Practice with real client projects",
          "Stay current with design trends",
        ],
      },
      business: {
        title: "Business & Strategy",
        description: "You have strong analytical and communication skills suited for business roles.",
        careers: [
          "Business Analyst",
          "Project Manager",
          "Digital Marketing Manager",
          "Product Manager",
          "Consultant",
          "Operations Manager",
        ],
        skills: [
          "Project Management (Agile, Scrum)",
          "Data Analysis and Reporting",
          "Strategic Planning",
          "Communication and Presentation",
          "Market Research",
          "Financial Analysis",
        ],
        learningPath: [
          "Develop analytical and critical thinking skills",
          "Learn project management methodologies",
          "Gain experience with business tools and software",
          "Build communication and leadership skills",
          "Understand market dynamics and trends",
          "Practice with real business scenarios",
        ],
      },
    }

    return recommendations[primaryPath]
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const calculatedResults = calculateResults()
      setResults(calculatedResults)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleComplete = () => {
    // Save assessment results and redirect to dashboard
    const studentData = JSON.parse(localStorage.getItem("studentData") || "{}")
    const completeData = {
      ...studentData,
      assessmentResults: results,
      completedAt: new Date().toISOString(),
    }
    localStorage.setItem("studentData", JSON.stringify(completeData))
    window.location.href = "/dashboard"
  }

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Assessment Complete!</span>
            </div>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-3xl text-center">
                Your Career Path: {results.recommendations.title}
              </CardTitle>
              <p className="text-gray-300 text-center text-lg mt-2">{results.recommendations.description}</p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{results.scores.tech}</div>
                  <div className="text-white">Technology</div>
                </div>
                <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{results.scores.creative}</div>
                  <div className="text-white">Creative</div>
                </div>
                <div className="text-center p-4 bg-orange-500/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{results.scores.business}</div>
                  <div className="text-white">Business</div>
                </div>
              </div>

              {/* Career Recommendations */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Recommended Careers</h3>
                  <ul className="space-y-2">
                    {results.recommendations.careers.map((career, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Key Skills to Develop</h3>
                  <ul className="space-y-2">
                    {results.recommendations.skills.map((skill, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Learning Path</h3>
                  <ul className="space-y-2">
                    {results.recommendations.learningPath.slice(0, 4).map((step, index) => (
                      <li key={index} className="text-gray-300 flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleComplete}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between max-w-4xl mx-auto pt-8 pb-4">
        <Link href="/auth/student-register">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded opacity-90"></div>
          </div>
          <span className="text-xl font-bold text-white">SkillBridge Assessment</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">
              Question {currentQuestion + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-white text-sm">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">{assessmentQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[assessmentQuestions[currentQuestion].id] || ""}
              onValueChange={(value) => handleAnswer(assessmentQuestions[currentQuestion].id, value)}
              className="space-y-4"
            >
              {assessmentQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-white cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between pt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-700 bg-transparent"
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[assessmentQuestions[currentQuestion].id]}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {currentQuestion === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
