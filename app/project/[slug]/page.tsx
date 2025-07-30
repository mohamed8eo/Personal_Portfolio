"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, Zap, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  topics: string[]
  visibility: string
  fork: boolean
  size: number
  open_issues_count: number
}

interface GitHubContent {
  name: string
  path: string
  type: string
  download_url: string | null
  content: string | null
}



export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const pageRef = useRef<HTMLDivElement>(null)
  const [repo, setRepo] = useState<GitHubRepo | null>(null)
  const [projectImage, setProjectImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const slug = params.slug as string

  // Fetch repository data and images
  useEffect(() => {
    const fetchRepoAndImages = async () => {
      try {
        setLoading(true)
        
        // Fetch repository data
        const response = await fetch(`https://api.github.com/repos/mohamed8eo/${slug}`)
        
        if (!response.ok) {
          throw new Error(`Repository not found: ${response.status}`)
        }
        
        const data = await response.json()
        setRepo(data)
        
        // Fetch repository contents to find images
        try {
          const contentsResponse = await fetch(`https://api.github.com/repos/mohamed8eo/${slug}/contents`)
          
          if (contentsResponse.ok) {
            const contents: GitHubContent[] = await contentsResponse.json()
            
            // Look for common image files
            const imageFiles = contents.filter(file => 
              file.type === 'file' && 
              /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file.name) &&
              /^(screenshot|preview|demo|image|img|banner|logo|icon)/i.test(file.name)
            )
            
            if (imageFiles.length > 0) {
              // Use the first image found
              setProjectImage(imageFiles[0].download_url)
            } else {
              // Look for any image in the root
              const anyImage = contents.find(file => 
                file.type === 'file' && 
                /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file.name)
              )
              
              if (anyImage) {
                setProjectImage(anyImage.download_url)
              }
            }
          }
        } catch (imageErr) {
          console.log('Error fetching images:', imageErr)
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository')
        console.error('Error fetching repo:', err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchRepoAndImages()
    }
  }, [slug])

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33',
      'Dart': '#00B4AB',
      'Vue': '#2fc27d',
      'React': '#61dafb',
      'Next.js': '#000000',
      'Node.js': '#339933',
    }
    return colors[language || ''] || '#6e7681'
  }

  const getProjectImage = (repo: GitHubRepo) => {
    // If we have a fetched image, use it
    if (projectImage) {
      return projectImage
    }
    
    // Fallback to placeholder with project name
    return `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(repo.name)}`
  }

  useEffect(() => {
    if (!repo) return

    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.from(".project-header", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".project-image", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })

      gsap.from(".project-content", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      })

      gsap.from(".project-sidebar", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      })

      // Feature items animation
      gsap.from(".feature-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      })

      // Challenge items animation
      gsap.from(".challenge-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [repo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-4">Loading Project...</h1>
        </div>
      </div>
    )
  }

  if (error || !repo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-4">{error || "The requested project could not be found."}</p>
          <Button onClick={() => router.push("/#projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/#projects")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <div className="flex space-x-4">
              {repo.homepage && (
              <Button asChild>
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </a>
              </Button>
              )}
              <Button variant="outline" asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Project Header */}
        <div className="project-header text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {repo.fork ? "Forked Project" : "Original Project"}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
        </div>

        {/* Project Image */}
        <div className="project-image mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={getProjectImage(repo)}
              alt={repo.name}
              width={800}
              height={525}
              className="w-full h-[525px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 project-content">
            {/* Project Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <div className="space-y-4">
                {/* README Link */}
                <div className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Want More Details?</h4>
                      <p className="text-sm text-muted-foreground">
                        View the full project documentation, setup instructions, and technical details.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="flex-shrink-0">
                      <a 
                        href={`https://github.com/mohamed8eo/${repo.name}/blob/main/README.md`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View README
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Repository Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Repository Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="feature-item flex items-start space-x-3 p-4 bg-card border rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Repository Size</p>
                    <p className="text-xs text-muted-foreground">{repo.size} KB</p>
                  </div>
                </div>
                <div className="feature-item flex items-start space-x-3 p-4 bg-card border rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{formatDate(repo.updated_at)}</p>
                  </div>
                </div>
                <div className="feature-item flex items-start space-x-3 p-4 bg-card border rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="h-3 w-3 text-primary" />
                    </div>
                  <div>
                    <p className="text-sm font-medium">Open Issues</p>
                    <p className="text-xs text-muted-foreground">{repo.open_issues_count}</p>
                  </div>
              </div>
                <div className="feature-item flex items-start space-x-3 p-4 bg-card border rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="h-3 w-3 text-primary" />
                    </div>
                  <div>
                    <p className="text-sm font-medium">Visibility</p>
                    <p className="text-xs text-muted-foreground capitalize">{repo.visibility}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="project-sidebar">
            {/* Project Stats */}
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Stars</span>
                  </div>
                  <span className="font-semibold">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GitFork className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Forks</span>
                  </div>
                  <span className="font-semibold">{repo.forks_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Created</span>
                  </div>
                  <span className="font-semibold">{formatDate(repo.created_at)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Size</span>
                  </div>
                  <span className="font-semibold">{repo.size} KB</span>
                </div>
              </div>
            </div>

            {/* Language */}
            {repo.language && (
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Primary Language</h3>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></div>
                  <span className="font-medium">{repo.language}</span>
                </div>
              </div>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
            <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                  </Badge>
                ))}
              </div>
            </div>
            )}

            {/* Project Links */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Project Links</h3>
              <div className="space-y-3">
                {repo.homepage && (
                <Button asChild className="w-full">
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
                )}
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

