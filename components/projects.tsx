"use client"

import { ExternalLink, Github, Calendar, Users, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [repoImages, setRepoImages] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  // Fetch GitHub repositories and images
  useEffect(() => {
    const fetchReposAndImages = async () => {
      try {
        setLoading(true)
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const response = await fetch('https://api.github.com/users/mohamed8eo/repos', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'developer-portfolio'
          }
        })
        
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.')
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Filter out forks and sort by creation date (newest first)
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.fork)
          .sort((a: GitHubRepo, b: GitHubRepo) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          })
        
        setRepos(filteredRepos)
        
        // Fetch images for each repository with delays to avoid rate limiting
        const imagePromises = filteredRepos.map(async (repo: GitHubRepo, index: number) => {
          try {
            // Add delay between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, index * 200))
            
            const contentsResponse = await fetch(`https://api.github.com/repos/mohamed8eo/${repo.name}/contents`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'developer-portfolio'
              }
            })
            
            if (contentsResponse.ok) {
              const contents: GitHubContent[] = await contentsResponse.json()
              
              // Look for common image files
              const imageFiles = contents.filter(file => 
                file.type === 'file' && 
                /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file.name) &&
                /^(screenshot|preview|demo|image|img|banner|logo|icon)/i.test(file.name)
              )
              
              if (imageFiles.length > 0) {
                return { repoName: repo.name, imageUrl: imageFiles[0].download_url }
              } else {
                // Look for any image in the root
                const anyImage = contents.find(file => 
                  file.type === 'file' && 
                  /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file.name)
                )
                
                if (anyImage) {
                  return { repoName: repo.name, imageUrl: anyImage.download_url }
                }
              }
            }
          } catch (imageErr) {
            console.log(`Error fetching images for ${repo.name}:`, imageErr)
          }
          
          return { repoName: repo.name, imageUrl: null }
        })
        
        const imageResults = await Promise.all(imagePromises)
        const imagesMap: { [key: string]: string } = {}
        
        imageResults.forEach(result => {
          if (result.imageUrl) {
            imagesMap[result.repoName] = result.imageUrl
          }
        })
        
        setRepoImages(imagesMap)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories')
        console.error('Error fetching repos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReposAndImages()
  }, [])

  const handleProjectClick = (projectTitle: string) => {
    const projectSlug = projectTitle.toLowerCase().replace(/\s+/g, "-")
    router.push(`/project/${projectSlug}`)
  }

  // Helper function to get language color
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

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Helper function to get project image
  const getProjectImage = (repo: GitHubRepo) => {
    // If we have a fetched image for this repo, use it
    if (repoImages[repo.name]) {
      return repoImages[repo.name]
    }
    
    // Fallback to placeholder with project name
    return `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(repo.name)}`
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating technical skills and creative problem-solving
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading projects: {error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid gap-8">
            {repos.slice(0, 5).map((repo, index) => (
              <div
                key={repo.id}
                className="project-card group grid lg:grid-cols-2 gap-8 bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => handleProjectClick(repo.name)}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={getProjectImage(repo)}
                    alt={repo.name}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      {repo.homepage && (
                        <Button size="sm" asChild>
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="outline" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      {index < 3 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {repo.description || "No description available."}
                    </p>

                    {/* Language and Stats */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                          Language
                        </h4>
                        {repo.language && (
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></div>
                            <span className="text-sm">{repo.language}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* GitHub Stats */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center">
                          <GitFork className="h-4 w-4 mr-1" />
                          {repo.forks_count}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </div>

                    {/* Topics/Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                          Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {repo.topics.slice(0, 5).map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {repo.homepage && (
                      <Button asChild className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 bg-transparent"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View More Projects */}
        <div className="animate-on-scroll text-center mt-12">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Showing {Math.min(repos.length, 5)} of {repos.length} projects
            </p>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/mohamed8eo" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
