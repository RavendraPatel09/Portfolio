/**
 * GitHub API Service for Ravendra Patel's Developer Portfolio
 *
 * Provides live fetching, pagination, language aggregation, activity events,
 * and intelligent client-side caching to respect GitHub's unauthenticated 60 req/hr rate limit.
 */

export const GITHUB_USERNAME = 'RavendraPatel09'
const CACHE_KEY = `rp_gh_insights_${GITHUB_USERNAME}_v2`
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes cache

// Official GitHub language color mappings for authentic visual representation
export const LANGUAGE_COLORS = {
  Python: '#3572A5',
  'C++': '#f34b7d',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
  SQL: '#e38c00',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Default: '#00FF9D',
}

/**
 * Format bytes into human-readable string (e.g. 450 KB, 1.2 MB)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Format ISO date into relative time string (e.g. "2h ago", "3d ago")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInSec = Math.floor((now - date) / 1000)

  if (diffInSec < 60) return 'just now'
  const diffInMin = Math.floor(diffInSec / 60)
  if (diffInMin < 60) return `${diffInMin}m ago`
  const diffInHours = Math.floor(diffInMin / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays}d ago`
  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) return `${diffInMonths}mo ago`
  return `${Math.floor(diffInDays / 365)}y ago`
}

/**
 * Read cached dashboard data from localStorage if still fresh
 */
export function getCachedGitHubData() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !parsed.timestamp || !parsed.data) return null

    const age = Date.now() - parsed.timestamp
    const isExpired = age > CACHE_TTL_MS

    return {
      data: parsed.data,
      cachedAt: parsed.timestamp,
      isExpired,
    }
  } catch {
    return null
  }
}

/**
 * Save fresh dashboard data to localStorage
 */
export function setCachedGitHubData(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    )
  } catch {
    // Ignore storage quota errors in private browsing
  }
}

/**
 * Fetch raw GitHub profile
 */
async function fetchProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`)
  if (res.status === 403) {
    const resetHeader = res.headers.get('x-ratelimit-reset')
    const resetTime = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null
    const err = new Error('GitHub API rate limit exceeded')
    err.isRateLimit = true
    err.resetTime = resetTime
    throw err
  }
  if (!res.ok) {
    throw new Error(`Profile fetch failed (${res.status})`)
  }
  return res.json()
}

/**
 * Fetch all public repositories with pagination
 */
async function fetchRepos(username) {
  let repos = []
  let page = 1
  const maxPages = 3 // Up to 300 repos

  while (page <= maxPages) {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`
    )
    if (res.status === 403) {
      const resetHeader = res.headers.get('x-ratelimit-reset')
      const resetTime = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null
      const err = new Error('GitHub API rate limit exceeded')
      err.isRateLimit = true
      err.resetTime = resetTime
      throw err
    }
    if (!res.ok) break

    const pageData = await res.json()
    if (!Array.isArray(pageData) || pageData.length === 0) break
    repos = repos.concat(pageData)
    if (pageData.length < 100) break
    page++
  }

  return repos
}

/**
 * Fetch language breakdown for repositories with rate-limit fallback
 */
async function fetchLanguageStats(username, repos) {
  const languageBytesMap = {}
  const targetRepos = repos.filter((r) => !r.fork).slice(0, 10) // Focus on top 10 own repos to conserve quota

  try {
    const requests = targetRepos.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`)
        if (res.ok) {
          const data = await res.json()
          return data
        }
      } catch {
        return null
      }
      return null
    })

    const results = await Promise.allSettled(requests)
    let fetchedAny = false

    results.forEach((r) => {
      if (r.status === 'fulfilled' && r.value) {
        fetchedAny = true
        Object.entries(r.value).forEach(([lang, bytes]) => {
          languageBytesMap[lang] = (languageBytesMap[lang] || 0) + bytes
        })
      }
    })

    // If individual language APIs failed or hit quota, aggregate from repo primary languages
    if (!fetchedAny) {
      repos.forEach((repo) => {
        if (repo.language) {
          const estimatedBytes = (repo.size || 10) * 1024
          languageBytesMap[repo.language] =
            (languageBytesMap[repo.language] || 0) + estimatedBytes
        }
      })
    }
  } catch {
    // Fallback: estimate from repo primary language
    repos.forEach((repo) => {
      if (repo.language) {
        const estimatedBytes = (repo.size || 10) * 1024
        languageBytesMap[repo.language] =
          (languageBytesMap[repo.language] || 0) + estimatedBytes
      }
    })
  }

  const totalBytes = Object.values(languageBytesMap).reduce((a, b) => a + b, 0)
  if (totalBytes === 0) {
    return []
  }

  const breakdown = Object.entries(languageBytesMap)
    .map(([name, bytes]) => {
      const percentage = (bytes / totalBytes) * 100
      return {
        name,
        bytes,
        formattedBytes: formatBytes(bytes),
        percentage: parseFloat(percentage.toFixed(1)),
        color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.Default,
      }
    })
    .sort((a, b) => b.bytes - a.bytes)

  return breakdown
}

/**
 * Fetch recent public activity events
 */
async function fetchRecentEvents(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=20`)
    if (!res.ok) return []
    const events = await res.json()
    if (!Array.isArray(events)) return []

    return events
      .filter((e) => e && e.type)
      .slice(0, 10)
      .map((e) => {
        let title = 'Activity'
        let details = ''

        switch (e.type) {
          case 'PushEvent': {
            const count = e.payload?.commits?.length || 1
            const branch = (e.payload?.ref || 'main').replace('refs/heads/', '')
            title = `Pushed ${count} commit${count > 1 ? 's' : ''} to ${branch}`
            details = e.payload?.commits?.[0]?.message || 'Code improvements'
            break
          }
          case 'CreateEvent': {
            const refType = e.payload?.ref_type || 'repository'
            title = `Created ${refType} ${e.payload?.ref || ''}`.trim()
            details = e.payload?.description || 'Repository initialized'
            break
          }
          case 'WatchEvent':
            title = 'Starred repository'
            details = e.repo?.name || ''
            break
          case 'ForkEvent':
            title = 'Forked repository'
            details = `Forked into ${e.payload?.forkee?.full_name || ''}`
            break
          case 'PullRequestEvent':
            title = `Pull Request: ${e.payload?.action || 'opened'}`
            details = e.payload?.pull_request?.title || ''
            break
          case 'IssuesEvent':
            title = `Issue: ${e.payload?.action || 'opened'}`
            details = e.payload?.issue?.title || ''
            break
          case 'ReleaseEvent':
            title = `Published Release: ${e.payload?.release?.tag_name || ''}`
            details = e.payload?.release?.name || ''
            break
          default:
            title = e.type.replace('Event', '')
            details = e.repo?.name || ''
        }

        return {
          id: e.id,
          type: e.type,
          repoName: e.repo?.name || 'GitHub Repository',
          repoUrl: `https://github.com/${e.repo?.name || username}`,
          title,
          details,
          date: e.created_at,
          relativeTime: formatRelativeTime(e.created_at),
        }
      })
  } catch {
    return []
  }
}

/**
 * Fetch genuine contribution activity via public contribution calendar or authenticated GraphQL
 */
async function fetchContributions(username) {
  // 1. Try public contribution API (CORS enabled, genuine calendar data without exposing tokens)
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
    if (res.ok) {
      const data = await res.json()
      if (data && data.contributions && Array.isArray(data.contributions)) {
        const days = data.contributions
        const total = data.total?.lastYear ?? days.reduce((a, b) => a + (b.count || 0), 0)

        // Calculate current streak
        let currentStreak = 0
        const reversed = [...days].reverse()
        for (const day of reversed) {
          if (day.count > 0) {
            currentStreak++
          } else if (currentStreak > 0) {
            break
          }
        }

        return {
          available: true,
          total,
          days,
          currentStreak,
        }
      }
    }
  } catch {
    // If public API is not reachable, fall through to auth requirement notice
  }

  // 2. Return transparent status explaining GitHub GraphQL requirements
  return {
    available: false,
    reason: 'GRAPHQL_AUTH_REQUIRED',
    message:
      'GitHub’s official contribution calendar requires authenticated GraphQL access to protect user contribution privacy. Public repositories, code language distributions, and recent commit events are live below.',
  }
}

/**
 * Master method: Fetch complete live GitHub Dashboard dataset
 */
export async function fetchLiveGitHubDashboard(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = getCachedGitHubData()
    if (cached && !cached.isExpired) {
      return {
        ...cached.data,
        isFromCache: true,
        lastUpdated: new Date(cached.cachedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
    }
  }

  // Fetch live from GitHub APIs in parallel
  const [profile, repos, events, contributions] = await Promise.all([
    fetchProfile(GITHUB_USERNAME),
    fetchRepos(GITHUB_USERNAME),
    fetchRecentEvents(GITHUB_USERNAME),
    fetchContributions(GITHUB_USERNAME),
  ])

  // Aggregate repository stats
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

  // Language breakdown
  const languages = await fetchLanguageStats(GITHUB_USERNAME, repos)

  // Format clean repository items
  const cleanRepos = repos.map((r) => ({
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description || 'No description provided.',
    language: r.language || 'Code',
    languageColor: LANGUAGE_COLORS[r.language] || LANGUAGE_COLORS.Default,
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    updatedAt: r.updated_at,
    relativeUpdated: formatRelativeTime(r.updated_at),
    visibility: r.visibility || (r.private ? 'Private' : 'Public'),
    url: r.html_url,
    isFork: r.fork,
    homepage: r.homepage,
  }))

  const result = {
    profile: {
      username: profile.login,
      name: profile.name || profile.login,
      avatarUrl: profile.avatar_url,
      bio: profile.bio || 'Software Developer',
      publicRepos: profile.public_repos || cleanRepos.length,
      followers: profile.followers || 0,
      following: profile.following || 0,
      createdAt: profile.created_at,
      memberSince: new Date(profile.created_at).getFullYear(),
      profileUrl: profile.html_url,
      totalStars,
      totalForks,
    },
    repositories: cleanRepos,
    languages,
    events,
    contributions,
    lastUpdated: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    isFromCache: false,
  }

  setCachedGitHubData(result)
  return result
}
