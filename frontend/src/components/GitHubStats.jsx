import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GitFork,
  Star,
  Users,
  Code2,
  ExternalLink,
  RefreshCw,
  Clock,
  Calendar,
  AlertTriangle,
  Search,
  ChevronLeft,
  ChevronRight,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Tag,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Flame,
} from 'lucide-react'
import SectionReveal from './SectionReveal'
import {
  GITHUB_USERNAME,
  fetchLiveGitHubDashboard,
  formatBytes,
} from '../services/githubService'

export default function GitHubStats({ theme }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimitInfo, setRateLimitInfo] = useState(null)

  // Repository search, filter, and pagination
  const [repoQuery, setRepoQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const reposPerPage = 6

  // Load dashboard data
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const result = await fetchLiveGitHubDashboard(isRefresh)
      setData(result)
      setRateLimitInfo(null)
    } catch (err) {
      if (err.isRateLimit) {
        setRateLimitInfo(err.resetTime)
        // If we have existing data from cache, don't show full error
        if (!data) {
          setError(
            'GitHub API hourly rate limit reached for unauthenticated requests. Please wait a short while or explore repositories directly.'
          )
        }
      } else {
        if (!data) {
          setError(
            'Unable to connect to GitHub API right now. Please check your internet connection or try again.'
          )
        }
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [data])

  useEffect(() => {
    loadData(false)
  }, [loadData])

  // Extract unique languages from repositories for filter dropdown
  const availableLanguages = useMemo(() => {
    if (!data?.repositories) return ['All']
    const langs = new Set()
    data.repositories.forEach((r) => {
      if (r.language && r.language !== 'Code') {
        langs.add(r.language)
      }
    })
    return ['All', ...Array.from(langs)]
  }, [data])

  // Filtered and paginated repositories
  const filteredRepos = useMemo(() => {
    if (!data?.repositories) return []
    const q = repoQuery.trim().toLowerCase()
    return data.repositories.filter((r) => {
      const matchLang =
        selectedLanguage === 'All' || r.language === selectedLanguage
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
      return matchLang && matchSearch
    })
  }, [data, repoQuery, selectedLanguage])

  // Reset pagination on filter/search change
  useEffect(() => {
    setCurrentPage(1)
  }, [repoQuery, selectedLanguage])

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage) || 1
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * reposPerPage
    return filteredRepos.slice(start, start + reposPerPage)
  }, [filteredRepos, currentPage])

  return (
    <SectionReveal>
      <section id="github-stats" className="scroll-mt-24 px-6 py-14 sm:py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header & Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--glass-border)] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--electric)]/30 bg-[var(--electric)]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--electric)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon)]" />
                </span>
                Live GitHub Insights
              </div>

              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                GitHub Activity &amp; <span className="text-[var(--neon)]">Codebase</span> 🌌
              </h2>

              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[var(--text-muted)]">
                Real-time profile statistics, public repositories, code language distributions, and commit events directly from{' '}
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--electric)] hover:underline inline-flex items-center gap-0.5"
                >
                  @{GITHUB_USERNAME}
                  <ExternalLink size={12} className="inline ml-0.5" />
                </a>
                .
              </p>
            </div>

            {/* Refresh and Timestamp Controls */}
            <div className="flex items-center gap-3 shrink-0">
              {data?.lastUpdated && (
                <div className="hidden sm:flex flex-col items-end text-[11px] font-mono text-[var(--text-muted)]">
                  <span>
                    {data.isFromCache ? 'Cached Data' : 'Live Updated'}
                  </span>
                  <span className="text-[10px] opacity-75">{data.lastUpdated}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => loadData(true)}
                disabled={loading || refreshing}
                className="glass inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] px-3.5 py-2 text-xs font-semibold text-[var(--text)] transition-all duration-200 hover:border-[var(--neon)]/40 hover:text-[var(--neon)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] disabled:opacity-50"
                aria-label="Refresh GitHub data"
              >
                <RefreshCw
                  size={14}
                  className={refreshing ? 'animate-spin text-[var(--neon)]' : ''}
                />
                <span>{refreshing ? 'Fetching…' : 'Refresh'}</span>
              </button>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--neon)]/40 bg-[var(--neon)]/10 px-3.5 py-2 text-xs font-semibold text-[var(--neon)] transition-all duration-200 hover:bg-[var(--neon)]/20 hover:shadow-[0_0_20px_rgba(0,255,157,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)]"
              >
                <span>GitHub Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Rate limit warning notification */}
          {rateLimitInfo && (
            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-300">
              <AlertTriangle size={16} className="shrink-0 text-amber-400" />
              <span>
                GitHub unauthenticated rate limit reached for this IP. Displaying cached profile metrics until{' '}
                {rateLimitInfo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
              </span>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading && !data && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="glass h-24 animate-pulse rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-4"
                  />
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass h-64 animate-pulse rounded-3xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-6" />
                <div className="glass h-64 animate-pulse rounded-3xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-6" />
              </div>
            </div>
          )}

          {/* Complete Error State */}
          {error && !data && (
            <div className="mt-8 glass rounded-3xl border border-red-500/30 bg-red-500/5 p-8 text-center">
              <AlertCircle size={36} className="mx-auto text-red-400" />
              <h3 className="mt-3 font-display text-lg font-bold text-[var(--text)]">
                GitHub Data Temporarily Unavailable
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
                {error}
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => loadData(true)}
                  className="rounded-xl border border-[var(--neon)]/40 bg-[var(--neon)]/15 px-4 py-2 text-xs font-semibold text-[var(--neon)] hover:bg-[var(--neon)]/25"
                >
                  Retry Connection
                </button>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] px-4 py-2 text-xs font-semibold text-[var(--text)] hover:border-[var(--electric)]/40"
                >
                  Open GitHub Directly
                </a>
              </div>
            </div>
          )}

          {/* Live Content Dashboard */}
          {data && (
            <div className="mt-8 space-y-8">
              {/* Top Profile Metrics Row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {/* 1. Public Repositories */}
                <div className="glass group rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--neon)]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Repositories
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--neon)]/10 text-[var(--neon)]">
                      <Code2 size={15} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {data.profile.publicRepos}
                  </p>
                  <p className="mt-1 text-[10px] text-[var(--neon)] font-medium">
                    Verified Public
                  </p>
                </div>

                {/* 2. Total Stars */}
                <div className="glass group rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Total Stars
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                      <Star size={15} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {data.profile.totalStars}
                  </p>
                  <p className="mt-1 text-[10px] text-amber-400/90 font-medium">
                    Community Stargazers
                  </p>
                </div>

                {/* 3. Total Forks */}
                <div className="glass group rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--electric)]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Forks
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--electric)]/10 text-[var(--electric)]">
                      <GitFork size={15} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {data.profile.totalForks}
                  </p>
                  <p className="mt-1 text-[10px] text-[var(--electric)] font-medium">
                    Downstream Clones
                  </p>
                </div>

                {/* 4. Followers */}
                <div className="glass group rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Followers
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-400/10 text-purple-400">
                      <Users size={15} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {data.profile.followers}
                  </p>
                  <p className="mt-1 text-[10px] text-purple-400/90 font-medium">
                    Developer Network
                  </p>
                </div>

                {/* 5. Account Tenacity */}
                <div className="col-span-2 sm:col-span-4 lg:col-span-1 glass group rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--neon)]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Member Since
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--neon)]/10 text-[var(--neon)]">
                      <Calendar size={15} />
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {data.profile.memberSince}
                  </p>
                  <p className="mt-1 text-[10px] text-[var(--text-muted)] font-mono">
                    {data.profile.following} following
                  </p>
                </div>
              </div>

              {/* Middle Section: Languages Breakdown & Contribution Activity */}
              <div className="grid gap-6 lg:grid-cols-12 items-start">
                {/* Programming Languages Breakdown (7 cols) */}
                <div className="lg:col-span-7 glass rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)]">
                  <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-[var(--neon)]" />
                      <h3 className="font-display text-base font-bold text-[var(--text)]">
                        Language Distribution
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      Aggregated from repositories
                    </span>
                  </div>

                  {data.languages && data.languages.length > 0 ? (
                    <div className="mt-5 space-y-5">
                      {/* Dynamic Multi-Color Progress Bar */}
                      <div className="flex h-3.5 w-full overflow-hidden rounded-full border border-[var(--glass-border)] bg-[var(--chip-bg)] p-0.5">
                        {data.languages.map((l) => (
                          <div
                            key={l.name}
                            style={{
                              width: `${Math.max(l.percentage, 2)}%`,
                              backgroundColor: l.color,
                            }}
                            className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                            title={`${l.name}: ${l.percentage}% (${l.formattedBytes})`}
                          />
                        ))}
                      </div>

                      {/* Language Legend Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                        {data.languages.map((l) => (
                          <div
                            key={l.name}
                            className="flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--chip-bg)] px-3 py-2 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: l.color }}
                              />
                              <span className="font-medium text-[var(--text)] truncate">
                                {l.name}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)] ml-2 shrink-0">
                              {l.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-[var(--text-muted)]">
                      Language statistics are loading or not available.
                    </p>
                  )}
                </div>

                {/* Contribution Status / Heatmap (5 cols) */}
                <div className="lg:col-span-5 glass rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)]">
                  <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-[var(--electric)]" />
                      <h3 className="font-display text-base font-bold text-[var(--text)]">
                        Contribution Activity
                      </h3>
                    </div>
                    {data.contributions?.available && (
                      <span className="text-[11px] font-mono text-[var(--neon)] font-semibold">
                        {data.contributions.total} commits
                      </span>
                    )}
                  </div>

                  {data.contributions?.available ? (
                    <div className="mt-4 space-y-4">
                      {/* Compact Heatmap Display */}
                      <div className="overflow-x-auto pb-2">
                        <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[320px]">
                          {data.contributions.days.slice(-140).map((d) => {
                            const count = d.count || 0
                            let bgClass = 'bg-[var(--glass-border)]'
                            if (count > 0 && count <= 2) bgClass = 'bg-[var(--neon)]/30'
                            else if (count > 2 && count <= 5) bgClass = 'bg-[var(--neon)]/60'
                            else if (count > 5) bgClass = 'bg-[var(--neon)]'

                            return (
                              <div
                                key={d.date}
                                title={`${d.date}: ${count} contribution${count !== 1 ? 's' : ''}`}
                                className={`h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-125 ${bgClass}`}
                              />
                            )
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1 border-t border-[var(--glass-border)]">
                        <span>Current Streak: {data.contributions.currentStreak} days</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">Less</span>
                          <span className="h-2 w-2 rounded-[2px] bg-[var(--glass-border)]" />
                          <span className="h-2 w-2 rounded-[2px] bg-[var(--neon)]/30" />
                          <span className="h-2 w-2 rounded-[2px] bg-[var(--neon)]/60" />
                          <span className="h-2 w-2 rounded-[2px] bg-[var(--neon)]" />
                          <span className="text-[10px]">More</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Honest Auth Requirement Notice */
                    <div className="mt-4 flex flex-col justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-4 text-xs">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck size={18} className="text-[var(--electric)] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[var(--text)]">
                            GraphQL Authentication Notice
                          </p>
                          <p className="mt-1 text-[11px] text-[var(--text-muted)] leading-relaxed">
                            {data.contributions?.message ||
                              'GitHub’s official contribution calendar requires authenticated GraphQL access to protect user contribution privacy.'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--neon)]">
                          Verified Profile Activity
                        </span>
                        <a
                          href={`https://github.com/${GITHUB_USERNAME}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--electric)] hover:underline"
                        >
                          View Graph on GitHub
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Public GitHub Activity Feed */}
              <div className="glass rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)]">
                <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[var(--electric)]" />
                    <h3 className="font-display text-base font-bold text-[var(--text)]">
                      Recent Activity Feed
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">
                    Public events from GitHub API
                  </span>
                </div>

                {data.events && data.events.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {data.events.slice(0, 6).map((e) => {
                      let Icon = GitCommit
                      let iconColor = 'text-[var(--neon)] bg-[var(--neon)]/10'
                      if (e.type === 'CreateEvent') {
                        Icon = PlusCircle
                        iconColor = 'text-[var(--electric)] bg-[var(--electric)]/10'
                      } else if (e.type === 'WatchEvent') {
                        Icon = Star
                        iconColor = 'text-amber-400 bg-amber-400/10'
                      } else if (e.type === 'ForkEvent') {
                        Icon = GitFork
                        iconColor = 'text-purple-400 bg-purple-400/10'
                      } else if (e.type === 'PullRequestEvent') {
                        Icon = GitPullRequest
                        iconColor = 'text-sky-400 bg-sky-400/10'
                      }

                      return (
                        <div
                          key={e.id}
                          className="flex items-start gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-3.5 transition-colors hover:border-[var(--neon)]/30"
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconColor}`}
                          >
                            <Icon size={15} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <a
                                href={e.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-display text-xs font-bold text-[var(--text)] hover:text-[var(--neon)] truncate"
                              >
                                {e.repoName}
                              </a>
                              <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                                {e.relativeTime}
                              </span>
                            </div>
                            <p className="mt-0.5 text-[11px] font-medium text-[var(--electric)]">
                              {e.title}
                            </p>
                            {e.details && (
                              <p className="mt-1 text-[11px] text-[var(--text-muted)] line-clamp-1">
                                {e.details}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-[var(--text-muted)]">
                    No recent public activity recorded on GitHub.
                  </p>
                )}
              </div>

              {/* Repository Explorer Section */}
              <div className="glass rounded-3xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-5 sm:p-6 shadow-[var(--card-shadow)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--glass-border)] pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--text)]">
                      Public Repositories ({filteredRepos.length})
                    </h3>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                      Sorted by most recently updated
                    </p>
                  </div>

                  {/* Search and Language Filter Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-48">
                      <Search
                        size={13}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      />
                      <input
                        type="text"
                        value={repoQuery}
                        onChange={(e) => setRepoQuery(e.target.value)}
                        placeholder="Search repos…"
                        className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--input-bg)] py-1.5 pl-8 pr-3 text-xs text-[var(--text)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-[var(--neon)]/50 focus:ring-1 focus:ring-[var(--neon)]/30"
                      />
                    </div>

                    {/* Language Select */}
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="rounded-xl border border-[var(--glass-border)] bg-[var(--card-bg)] px-3 py-1.5 text-xs text-[var(--text)] outline-none transition-colors focus:border-[var(--neon)]/50"
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang} value={lang} className="bg-[var(--bg-elevated)] text-[var(--text)]">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Repositories Grid */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {paginatedRepos.map((repo) => (
                      <motion.div
                        key={repo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--chip-bg)] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--neon)]/40 hover:shadow-lg"
                      >
                        <div>
                          {/* Name + Visibility */}
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-display text-sm font-bold text-[var(--text)] hover:text-[var(--neon)] transition-colors truncate"
                              title={repo.name}
                            >
                              {repo.name}
                            </a>
                            <span className="shrink-0 rounded-full border border-[var(--glass-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[9px] font-semibold text-[var(--text-muted)] uppercase">
                              {repo.visibility}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-2">
                            {repo.description}
                          </p>

                          {/* Tags / Language */}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--glass-border)] bg-[var(--card-bg)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--text)]">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: repo.languageColor }}
                              />
                              <span>{repo.language}</span>
                            </span>

                            {repo.isFork && (
                              <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-medium text-purple-300">
                                Fork
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Footer with Stars, Forks, Updated & Link */}
                        <div className="mt-4 pt-3 border-t border-[var(--glass-border)]/60 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 text-[var(--text-muted)]">
                            <span className="inline-flex items-center gap-1 font-mono text-[11px]" title="Stars">
                              <Star size={12} className="text-amber-400" />
                              {repo.stars}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[11px]" title="Forks">
                              <GitFork size={12} className="text-[var(--electric)]" />
                              {repo.forks}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)] opacity-75">
                              {repo.relativeUpdated}
                            </span>
                          </div>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--neon)] hover:text-[var(--text)] transition-colors"
                          >
                            <span>Code</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredRepos.length === 0 && (
                  <div className="py-10 text-center text-xs text-[var(--text-muted)]">
                    No repositories match your query.
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--glass-border)]/60 pt-4 text-xs">
                    <span className="text-[var(--text-muted)] font-mono text-[11px]">
                      Showing {(currentPage - 1) * reposPerPage + 1}–
                      {Math.min(currentPage * reposPerPage, filteredRepos.length)} of{' '}
                      {filteredRepos.length} repositories
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-[var(--chip-bg)] text-[var(--text)] hover:border-[var(--neon)]/40 disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      <span className="font-mono text-xs text-[var(--text)] px-2">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        type="button"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-[var(--chip-bg)] text-[var(--text)] hover:border-[var(--neon)]/40 disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </SectionReveal>
  )
}
