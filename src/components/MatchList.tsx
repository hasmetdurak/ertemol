'use client'

import { useState } from 'react'
import { LanguageGrid } from './LanguageGrid'

interface Match {
  id: number
  home: string
  away: string
  group: string
  status: string
  scoreHome: number | null
  scoreAway: number | null
  minute: string | null
  kickoffUtc: string
  streamCountByLang: Record<string, number>
}

interface MatchListProps {
  matches: Match[]
}

function formatLocalTime(utcStr: string): string {
  return new Date(utcStr).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function MatchList({ matches }: MatchListProps) {
  const [expandedMatchId, setExpandedMatchId] = useState<number | null>(null)

  const liveStatuses = ['1H', 'HT', '2H', 'ET']

  return (
    <div className="border border-border" style={{ borderRadius: 8 }}>
      {matches.map((match) => {
        const isLive = liveStatuses.includes(match.status)
        const isExpanded = expandedMatchId === match.id
        const totalSpeakers = Object.values(match.streamCountByLang).reduce(
          (a, b) => a + b,
          0
        )

        return (
          <div key={match.id}>
            <button
              onClick={() =>
                setExpandedMatchId(isExpanded ? null : match.id)
              }
              className="w-full flex items-center gap-3 px-4 border-b border-border last:border-b-0 hover:bg-black/[0.02] transition-colors"
              style={{ height: 56 }}
            >
              <div className="w-16 shrink-0 text-xs text-muted font-500">
                {isLive ? (
                  <span className="flex items-center gap-1.5 text-live-red">
                    <span className="w-2 h-2 bg-live-red rounded-full animate-pulse" />
                    {match.status === 'HT' ? 'HT' : `${match.minute}'`}
                  </span>
                ) : match.status === 'FT' ? (
                  <span className="text-muted font-500">FT</span>
                ) : (
                  formatLocalTime(match.kickoffUtc)
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <span className="text-sm font-500 text-fg">
                  {match.home}{' '}
                  <span className="text-muted mx-1">vs</span>{' '}
                  {match.away}
                </span>
              </div>

              <div
                className="text-[10px] uppercase text-muted border border-border px-1.5 py-0.5 shrink-0"
                style={{ borderRadius: 4 }}
              >
                {match.group}
              </div>

              <div className="w-14 text-right text-sm font-500">
                {isLive || match.status === 'FT' ? (
                  <span className="font-mono">
                    {match.scoreHome ?? '–'}–{match.scoreAway ?? '–'}
                  </span>
                ) : (
                  <span className="text-muted text-xs">vs</span>
                )}
              </div>

              <div className="w-12 text-right">
                {totalSpeakers > 0 ? (
                  <span className="text-xs font-500 text-accent">
                    {totalSpeakers}
                  </span>
                ) : (
                  <span className="text-xs text-muted">—</span>
                )}
              </div>

              <svg
                className={`w-4 h-4 text-muted transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isExpanded && (
              <div className="border-t border-border bg-black/[0.02] px-4 py-4">
                <div className="text-xs font-500 text-muted uppercase tracking-wider mb-3">
                  Select commentary language
                </div>
                <LanguageGrid matchId={match.id} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
