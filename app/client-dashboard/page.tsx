"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Users,
  DollarSign,
  Clock,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Star,
  MapPin,
  LogOut,
} from "lucide-react"
import { BrainLogo } from "@/components/brain-logo"
import { ThemeToggle } from "@/components/theme-toggle"

const mockFreelancers = [
  {
    id: 1,
    name: "John Doe",
    rating: 4.5,
    hourlyRate: "$50/hour",
    location: "New York",
    availability: "Available",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4.8,
    hourlyRate: "$60/hour",
    location: "San Francisco",
    availability: "Available",
    skills: ["UI/UX Design", "Figma", "Prototyping"],
  },
]

export default function ClientDashboard() {
  const [clientData, setClientData] = useState(null)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    timeline: "",
    skills: "",
    category: "",
  })
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const data = localStorage.getItem("clientData")
    if (data) {
      setClientData(JSON.parse(data))
    }

    const savedProjects = localStorage.getItem("clientProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      const mockProjects = [
        {
          id: 1,
          title: "E-commerce Website Development",
          description: "Need a full-stack e-commerce website with payment integration",
          budget: "$5,000 - $8,000",
          timeline: "2-3 months",
          applicants: 12,
          status: "active",
          posted: "2 days ago",
          skills: ["React", "Node.js", "MongoDB", "Stripe"],
          category: "Web Development",
        },
        {
          id: 2,
          title: "Mobile App UI/UX Design",
          description: "Design modern and intuitive UI/UX for a fitness mobile app",
          budget: "$2,000 - $3,500",
          timeline: "1 month",
          applicants: 8,
          status: "in-progress",
          posted: "1 week ago",
          skills: ["UI/UX Design", "Figma", "Prototyping"],
          category: "Design",
        },
      ]
      setProjects(mockProjects)
      localStorage.setItem("clientProjects", JSON.stringify(mockProjects))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("clientData")
    window.location.href = "/"
  }

  const handlePostProject = () => {
    const project = {
      id: Date.now(),
      ...newProject,
      applicants: 0,
      status: "active",
      posted: "Just now",
      skills: newProject.skills.split(",").map((s) => s.trim()),
    }

    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem("clientProjects", JSON.stringify(updatedProjects))

    setNewProject({
      title: "",
      description: "",
      budget: "",
      timeline: "",
      skills: "",
      category: "",
    })
  }

  if (!clientData) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrainLogo size="md" />
              <div>
                <h1 className="text-xl font-bold text-white">{clientData.companyName}</h1>
                <p className="text-gray-300 text-sm">{clientData.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Post a New Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-white">
                        Project Title
                      </Label>
                      <Input
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Enter project title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Describe your project requirements"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget" className="text-white">
                          Budget Range
                        </Label>
                        <Select onValueChange={(value) => setNewProject({ ...newProject, budget: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="$500 - $1,000">$500 - $1,000</SelectItem>
                            <SelectItem value="$1,000 - $2,500">$1,000 - $2,500</SelectItem>
                            <SelectItem value="$2,500 - $5,000">$2,500 - $5,000</SelectItem>
                            <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                            <SelectItem value="$10,000+">$10,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline" className="text-white">
                          Timeline
                        </Label>
                        <Select onValueChange={(value) => setNewProject({ ...newProject, timeline: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                            <SelectItem value="1 month">1 month</SelectItem>
                            <SelectItem value="2-3 months">2-3 months</SelectItem>
                            <SelectItem value="3-6 months">3-6 months</SelectItem>
                            <SelectItem value="6+ months">6+ months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="skills" className="text-white">
                        Required Skills (comma-separated)
                      </Label>
                      <Input
                        id="skills"
                        value={newProject.skills}
                        onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-white">
                        Category
                      </Label>
                      <Select onValueChange={(value) => setNewProject({ ...newProject, category: value })}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web Development">Web Development</SelectItem>
                          <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handlePostProject}
                      className="w-full bg-purple-500 hover:bg-purple-600"
                      disabled={!newProject.title || !newProject.description}
                    >
                      Post Project
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <p className="text-gray-300 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold text-white">20</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white">$12,500</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg. Completion</p>
                  <p className="text-2xl font-bold text-white">3.2 weeks</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-gray-800/50 border-gray-700">
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-500">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="freelancers" className="data-[state=active]:bg-purple-500">
              Find Freelancers
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-500">
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Post a New Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          Project Title
                        </Label>
                        <Input
                          id="title"
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Enter project title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-white">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Describe your project requirements"
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="budget" className="text-white">
                            Budget Range
                          </Label>
                          <Select onValueChange={(value) => setNewProject({ ...newProject, budget: value })}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="$500 - $1,000">$500 - $1,000</SelectItem>
                              <SelectItem value="$1,000 - $2,500">$1,000 - $2,500</SelectItem>
                              <SelectItem value="$2,500 - $5,000">$2,500 - $5,000</SelectItem>
                              <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="$10,000+">$10,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timeline" className="text-white">
                            Timeline
                          </Label>
                          <Select onValueChange={(value) => setNewProject({ ...newProject, timeline: value })}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                              <SelectItem value="1 month">1 month</SelectItem>
                              <SelectItem value="2-3 months">2-3 months</SelectItem>
                              <SelectItem value="3-6 months">3-6 months</SelectItem>
                              <SelectItem value="6+ months">6+ months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="skills" className="text-white">
                          Required Skills (comma-separated)
                        </Label>
                        <Input
                          id="skills"
                          value={newProject.skills}
                          onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-white">
                          Category
                        </Label>
                        <Select onValueChange={(value) => setNewProject({ ...newProject, category: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handlePostProject}
                        className="w-full bg-purple-500 hover:bg-purple-600"
                        disabled={!newProject.title || !newProject.description}
                      >
                        Post Project
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {project.budget}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {project.timeline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {project.applicants} applicants
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={project.status === "active" ? "default" : "secondary"}
                          className={
                            project.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }
                        >
                          {project.status}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white">{project.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-white font-semibold mb-2">Description</h4>
                                <p className="text-gray-300">{project.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-white font-semibold mb-2">Budget</h4>
                                  <p className="text-gray-300">{project.budget}</p>
                                </div>
                                <div>
                                  <h4 className="text-white font-semibold mb-2">Timeline</h4>
                                  <p className="text-gray-300">{project.timeline}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold mb-2">Required Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.skills.map((skill) => (
                                    <Badge key={skill} className="bg-purple-500/20 text-purple-400">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold mb-2">Status</h4>
                                <Badge
                                  className={
                                    project.status === "active"
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-blue-500/20 text-blue-400"
                                  }
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">Posted {project.posted}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Freelancers Tab */}
          <TabsContent value="freelancers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Find Freelancers</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" className="border-gray-600 text-white bg-transparent">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {mockFreelancers.map((freelancer) => (
                <Card key={freelancer.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {freelancer.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{freelancer.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-white font-medium">{freelancer.rating}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-purple-400 font-medium">{freelancer.hourlyRate}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{freelancer.location}</span>
                            <span className="text-gray-300">•</span>
                            <Badge className="bg-green-500/20 text-green-400">{freelancer.availability}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {freelancer.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-white bg-transparent">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          Hire Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
              <p className="text-gray-300">Start a conversation with freelancers to see messages here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
