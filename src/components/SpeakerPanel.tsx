'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface Speaker {
  id: string
  langCode: string
  mountPoint: string
  startedAt: string
  listeners: number
  score: number
  user: {
    id: string
    name: string
    image: string | null
  }
  voteCount: number
}

interface SpeakerPanelProps {
  matchId: number
  langCode: string
}

function generateM3U(name: string, url: string): string {
  return `#EXTM3U\n#EXTINF:-1,Ertemol - ${name}\n${url}`
}

export function SpeakerPanel({ matchId, langCode }: SpeakerPanelProps) {
  const { data: session } = useSession()
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ lang: langCode })
    fetch(`/api/matches/${matchId}/streams?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setSpeakers(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [matchId, langCode])

  function copyUrl(streamId: string, mountPoint: string) {
    const url = `${window.location.origin}/stream/${mountPoint}`
    navigator.clipboard.writeText(url)
    setCopiedId(streamId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  async function handleVote(streamId: string, value: number) {
    if (!session) return
    const prev = speakers.find((s) => s.id === streamId)
    setSpeakers((prevList) =>
      prevList.map((s) =>
        s.id === streamId ? { ...s, score: s.score + value } : s
      )
    )
    try {
      const res = await fetch(`/api/streams/${streamId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      })
      if (!res.ok && prev) {
        setSpeakers((prevList) =>
          prevList.map((s) =>
            s.id === streamId ? { ...s, score: prev.score } : s
          )
        )
      }
    } catch {
      if (prev) {
        setSpeakers((prevList) =>
          prevList.map((s) =>
            s.id === streamId ? { ...s, score: prev.score } : s
          )
        )
      }
    }
  }

  if (loading) {
    return <div className="text-sm text-muted py-4">Loading speakers...</div>
  }

  if (speakers.length === 0) {
    return (
      <div className="text-sm text-muted py-4">
        No active commentators for this language.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {speakers.map((speaker) => {
        const streamUrl = `${window.location.origin}/stream/${speaker.mountPoint}`
        const initials = speaker.user.name
          ? speaker.user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : '?'

        return (
          <div
            key={speaker.id}
            className="border border-border p-3"
            style={{ borderRadius: 8 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0"
                  style={{
                    backgroundColor: '#E8F5E9',
                    color: '#16A34A',
                    borderRadius: '50%',
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-fg">
                    {speaker.user.name}
                  </div>
                  <div className="text-xs text-muted">
                    {speaker.listeners} listening
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <button
                    onClick={() => handleVote(speaker.id, 1)}
                    className="px-2 py-1 border border-border hover:border-accent transition-colors text-muted hover:text-accent"
                    style={{ borderRadius: 4 }}
                  >
                    ↑
                  </button>
                  <span className="font-medium text-fg min-w-[2ch] text-center text-sm">
                    {speaker.score}
                  </span>
                  <button
                    onClick={() => handleVote(speaker.id, -1)}
                    className="px-2 py-1 border border-border hover:border-live-red transition-colors text-muted hover:text-live-red"
                    style={{ borderRadius: 4 }}
                  >
                    ↓
                  </button>
                </div>

                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
              </div>
            </div>

            <div className="mb-3">
              <audio controls className="w-full h-9 accent-accent" style={{ borderRadius: 4 }}>
                <source src={streamUrl} type="audio/mpeg" />
              </audio>
            </div>

            <div className="text-[10px] text-muted mb-2">
              MP3 · 64 kbps · Mono · 44.1 kHz
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`data:audio/x-mpegurl,${encodeURIComponent(generateM3U(speaker.user.name || 'Ertemol', streamUrl))}`}
                download={`ertemol_${speaker.id}.m3u`}
                className="h-[28px] px-2.5 inline-flex items-center text-[11px] font-medium border border-border bg-white text-fg hover:bg-bg transition-colors"
                style={{ borderRadius: 4 }}
              >
                <svg className="w-3 h-3 mr-1.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Open in VLC
              </a>

              <button
                onClick={() => copyUrl(speaker.id, speaker.mountPoint)}
                className="h-[28px] px-2.5 inline-flex items-center text-[11px] font-medium border border-border bg-white text-fg hover:bg-bg transition-colors"
                style={{ borderRadius: 4 }}
              >
                {copiedId === speaker.id ? 'Copied!' : 'Copy Stream URL'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
