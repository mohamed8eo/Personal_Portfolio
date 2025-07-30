import { NextRequest, NextResponse } from 'next/server'

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const USERNAME = 'mohamed8eo'

// Cache for storing API responses
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    
    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 })
    }

    // Check cache first
    const cacheKey = `${endpoint}`
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data)
    }

    // Prepare headers for GitHub API
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'developer-portfolio'
    }

    // Add authentication if token is available
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }

    // Make request to GitHub API
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers
    })

    if (!response.ok) {
      if (response.status === 403) {
        return NextResponse.json({ 
          error: 'GitHub API rate limit exceeded. Please try again later.',
          retryAfter: response.headers.get('x-ratelimit-reset')
        }, { status: 429 })
      }
      
      if (response.status === 404) {
        return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
      }
      
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })

    return NextResponse.json(data)

  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch data from GitHub API' 
    }, { status: 500 })
  }
} 