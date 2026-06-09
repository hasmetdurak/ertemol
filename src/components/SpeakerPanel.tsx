'use client'

import { useEffect, useState, useRef } from 'react'
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

export function SpeakerPanel({ matchId, langCode }: SpeakerPanelProps) {
  const { data: session } = useSession()
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [listeningStream, setListeningStream] = useState<string | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

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

  async function handleVote(streamId: string, value: number) {
    if (!session) return
    const res = await fetch(`/api/streams/${streamId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })
    if (res.ok) {
      const data = await res.json()
      setSpeakers((prev) =>
        prev.map((s) =>
          s.id === streamId ? { ...s, score: data.newScore } : s
        )
      )
    }
  }

  function handleListen(mountPoint: string) {
    if (listeningStream === mountPoint) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setListeningStream(null)
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
    }

    const hlsUrl = `/stream/${mountPoint}/index.m3u8`
    const audio = new Audio()
    audio.src = hlsUrl
    audio.play().catch(() => {})
    audioRef.current = audio
    setListeningStream(mountPoint)
  }

  function copyUrl(mountPoint: string) {
    const url = `${window.location.origin}/stream/${mountPoint}/index.m3u8`
    navigator.clipboard.writeText(url)
    setCopiedUrl(mountPoint)
    setTimeout(() => setCopiedUrl(null), 2000)
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
        const isListening = listeningStream === speaker.mountPoint
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
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center text-sm font-500 shrink-0"
                style={{
                  backgroundColor: '#E8F5E9',
                  color: '#16A34A',
                  borderRadius: '50%',
                }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-500 text-fg truncate">
                  {speaker.user.name}
                </div>
                <div className="text-xs text-muted">
                  {speaker.listeners} listening
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted">
                <button
                  onClick={() => handleVote(speaker.id, 1)}
                  className="px-2 py-1 border border-border hover:border-accent transition-colors"
                  style={{ borderRadius: 4 }}
                  title="Upvote"
                >
                  ↑
                </button>
                <span className="font-500 text-fg min-w-[2ch] text-center">
                  {speaker.score}
                </span>
                <button
                  onClick={() => handleVote(speaker.id, -1)}
                  className="px-2 py-1 border border-border hover:border-live-red transition-colors"
                  style={{ borderRadius: 4 }}
                  title="Downvote"
                >
                  ↓
                </button>
              </div>

              <button
                onClick={() => handleListen(speaker.mountPoint)}
                className={`text-sm font-500 px-4 py-1.5 transition-colors ${
                  isListening
                    ? 'bg-live-red text-white'
                    : 'bg-accent text-white'
                }`}
                style={{ borderRadius: 8 }}
              >
                {isListening ? 'Stop' : 'Listen'}
              </button>
            </div>

            {isListening && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/stream/${speaker.mountPoint}/index.m3u8`}
                  className="flex-1 text-xs text-muted bg-transparent border border-border px-2 py-1.5"
                  style={{ borderRadius: 4 }}
                />
                <button
                  onClick={() => copyUrl(speaker.mountPoint)}
                  className="text-xs font-500 text-accent border border-accent px-3 py-1.5 bg-transparent"
                  style={{ borderRadius: 6 }}
                >
                  {copiedUrl === speaker.mountPoint ? 'Copied!' : 'Copy for VLC'}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
