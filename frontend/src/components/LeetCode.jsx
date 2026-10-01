import { useState, useEffect } from 'react'
import { Code2, ExternalLink, RefreshCw, CheckCircle2, Award, Zap, HelpCircle } from 'lucide-react'
import { leetcode } from '../data/portfolioData.js'
import './LeetCode.css'

function LeetCode() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [customUser, setCustomUser] = useState(leetcode.username || '')
  const [activeUser, setActiveUser] = useState(leetcode.username || '')
  const [reloadTrigger, setReloadTrigger] = useState(0)

  const isPlaceholder = !activeUser || activeUser.startsWith('[') || activeUser === 'YOUR_LEETCODE_USERNAME'

  useEffect(() => {
    let ignore = false

    if (!activeUser || activeUser.startsWith('[') || activeUser === 'YOUR_LEETCODE_USERNAME') {
      setLoading(false)
      setStats(null)
      return
    }

    setLoading(true)
    setError(null)

    const fetchTelemetry = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        // Try primary responsive service
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/userProfile/${activeUser}`,
          { signal: controller.signal }
        )
        clearTimeout(timeoutId)

        if (!res.ok) {
          throw new Error('Primary service unavailable')
        }

        const data = await res.json()
        if (data.errors || data.message === 'user not found') {
          throw new Error('LeetCode user not found')
        }

        let rate = data.acceptanceRate
        if (
          !rate &&
          data.matchedUserStats?.acSubmissionNum &&
          data.matchedUserStats?.totalSubmissionNum
        ) {
          const ac =
            data.matchedUserStats.acSubmissionNum.find(
              (x) => x.difficulty === 'All'
            )?.submissions || 0
          const total =
            data.matchedUserStats.totalSubmissionNum.find(
              (x) => x.difficulty === 'All'
            )?.submissions || 1
          rate = ((ac / total) * 100).toFixed(1)
        }

        if (!ignore) {
          setStats({
            totalSolved: data.totalSolved || 0,
            totalQuestions: data.totalQuestions || 3300,
            easySolved: data.easySolved || 0,
            totalEasy: data.totalEasy || 830,
            mediumSolved: data.mediumSolved || 0,
            totalMedium: data.totalMedium || 1730,
            hardSolved: data.hardSolved || 0,
            totalHard: data.totalHard || 740,
            acceptanceRate: rate || '73.1',
            ranking: data.ranking || 'N/A',
            contributionPoints: data.contributionPoint || data.contributionPoints || 0,
          })
          setError(null)
        }
      } catch (err) {
        try {
          const fallbackRes = await fetch(
            `https://leetcode-stats-api.herokuapp.com/${activeUser}`
          )
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json()
            if (fallbackData.status === 'error') throw new Error(fallbackData.message)
            if (!ignore) {
              setStats(fallbackData)
              setError(null)
            }
          } else {
            throw new Error('Secondary service unavailable')
          }
        } catch (fallbackErr) {
          if (!ignore) {
            setError(
              `Could not load live stats for "${activeUser}". Check your username or verify network connection.`
            )
            setStats(null)
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchTelemetry()

    return () => {
      ignore = true
    }
  }, [activeUser, reloadTrigger])

  const handleUserSubmit = (e) => {
    e.preventDefault()
    if (customUser.trim()) {
      setActiveUser(customUser.trim())
    }
  }

  const handleRetry = () => {
    setReloadTrigger((v) => v + 1)
  }

  const profileUrl = isPlaceholder
    ? 'https://leetcode.com/'
    : `https://leetcode.com/u/${activeUser}/`

  return (
    <section id="leetcode">
      <div className="container">
        <div className="section-head-row">
          <div>
            <p className="section-eyebrow">03 — Problem Solving</p>
            <h2 className="section-title">LeetCode Statistics</h2>
            <p className="section-intro">
              Live algorithmic problem-solving telemetry, track record, and verified metrics.
            </p>
          </div>
          <div className="leetcode-actions-top">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline leetcode-profile-btn"
            >
              <span>Visit Profile</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {isPlaceholder ? (
          <div className="card leetcode-placeholder-card">
            <div className="leetcode-placeholder-icon">
              <Code2 size={36} color="var(--amber)" />
            </div>
            <div className="leetcode-placeholder-content">
              <h3>Connect Your Real LeetCode Profile</h3>
              <p>
                To display live rank, questions solved, acceptance rate, and difficulty breakdown,
                enter your LeetCode username below or update the <code>leetcode.username</code> field in{' '}
                <code>portfolioData.js</code>.
              </p>
              <form className="leetcode-user-form" onSubmit={handleUserSubmit}>
                <input
                  type="text"
                  placeholder="e.g. your_leetcode_handle"
                  value={customUser}
                  onChange={(e) => setCustomUser(e.target.value)}
                  className="leetcode-input"
                  aria-label="LeetCode Username"
                />
                <button type="submit" className="btn btn-primary">
                  Connect & Sync
                </button>
              </form>
            </div>
          </div>
        ) : loading ? (
          <div className="card leetcode-loading-card">
            <RefreshCw size={24} className="spin-icon" color="var(--pass)" />
            <p>Fetching real-time statistics for <strong>@{activeUser}</strong> from LeetCode...</p>
          </div>
        ) : error ? (
          <div className="card leetcode-error-card">
            <div className="leetcode-error-head">
              <HelpCircle size={22} color="var(--amber)" />
              <p className="leetcode-error-msg">{error}</p>
            </div>
            <div className="leetcode-error-actions">
              <button
                onClick={handleRetry}
                className="btn btn-outline btn-sm"
              >
                <RefreshCw size={14} /> Retry Sync
              </button>
              <form className="leetcode-switch-form" onSubmit={handleUserSubmit}>
                <input
                  type="text"
                  placeholder="Try another username..."
                  value={customUser}
                  onChange={(e) => setCustomUser(e.target.value)}
                  className="leetcode-input-sm"
                />
                <button type="submit" className="btn btn-ghost btn-sm">
                  Update
                </button>
              </form>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Open LeetCode directly →
              </a>
            </div>
          </div>
        ) : stats ? (
          <div className="leetcode-dashboard">
            {/* Overview Banner Card */}
            <div className="card leetcode-summary-card">
              <div className="leetcode-profile-pill">
                <span className="live-dot" />
                <span>Live Sync: @{activeUser}</span>
              </div>

              <div className="leetcode-stat-hero">
                <div className="leetcode-hero-circle">
                  <div className="leetcode-circle-inner">
                    <span className="leetcode-solved-num">{stats.totalSolved}</span>
                    <span className="leetcode-solved-sub">
                      / {stats.totalQuestions} Solved
                    </span>
                  </div>
                </div>

                <div className="leetcode-hero-meta">
                  <div className="leetcode-meta-item">
                    <span className="leetcode-meta-label">
                      <Award size={14} /> Global Rank
                    </span>
                    <span className="leetcode-meta-val">
                      {typeof stats.ranking === 'number'
                        ? `#${stats.ranking.toLocaleString()}`
                        : stats.ranking || 'Active'}
                    </span>
                  </div>
                  <div className="leetcode-meta-item">
                    <span className="leetcode-meta-label">
                      <Zap size={14} /> Acceptance Rate
                    </span>
                    <span className="leetcode-meta-val">
                      {stats.acceptanceRate ? `${stats.acceptanceRate}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="leetcode-meta-item">
                    <span className="leetcode-meta-label">
                      <CheckCircle2 size={14} /> Contribution
                    </span>
                    <span className="leetcode-meta-val">
                      {stats.contributionPoints || 0} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown Grid */}
            <div className="leetcode-breakdown-grid">
              {/* Easy Card */}
              <div className="card leetcode-diff-card diff-easy">
                <div className="diff-card-head">
                  <span className="diff-badge diff-badge-easy">Easy</span>
                  <span className="diff-count">
                    <strong>{stats.easySolved}</strong> / {stats.totalEasy}
                  </span>
                </div>
                <div className="diff-progress-track">
                  <div
                    className="diff-progress-bar bar-easy"
                    style={{
                      width: `${Math.min(
                        100,
                        (stats.easySolved / (stats.totalEasy || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <p className="diff-caption">Core foundations & syntax</p>
              </div>

              {/* Medium Card */}
              <div className="card leetcode-diff-card diff-medium">
                <div className="diff-card-head">
                  <span className="diff-badge diff-badge-medium">Medium</span>
                  <span className="diff-count">
                    <strong>{stats.mediumSolved}</strong> / {stats.totalMedium}
                  </span>
                </div>
                <div className="diff-progress-track">
                  <div
                    className="diff-progress-bar bar-medium"
                    style={{
                      width: `${Math.min(
                        100,
                        (stats.mediumSolved / (stats.totalMedium || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <p className="diff-caption">DSA & interview patterns</p>
              </div>

              {/* Hard Card */}
              <div className="card leetcode-diff-card diff-hard">
                <div className="diff-card-head">
                  <span className="diff-badge diff-badge-hard">Hard</span>
                  <span className="diff-count">
                    <strong>{stats.hardSolved}</strong> / {stats.totalHard}
                  </span>
                </div>
                <div className="diff-progress-track">
                  <div
                    className="diff-progress-bar bar-hard"
                    style={{
                      width: `${Math.min(
                        100,
                        (stats.hardSolved / (stats.totalHard || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <p className="diff-caption">Advanced optimization & DP</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default LeetCode
