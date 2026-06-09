'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { languages, type Language } from '@/lib/languages'

interface Match {
  id: number
  home: string
  away: string
  group: string
  kickoffUtc: string
}

export default function BroadcastPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatchId, setSelectedMatchId] = useState<string>('')
  const [selectedLang, setSelectedLang] = useState<string>('')
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [mountPoint, setMountPoint] = useState<string>('')
  const [hlsUrl, setHlsUrl] = useState<string>('')
  const [streamId, setStreamId] = useState<string>('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
      return
    }

    fetch('/api/matches')
      .then((res) => res.json())
      .then((data: Match[]) => setMatches(data))
      .catch(() => {})
  }, [status, router])

  async function startBroadcast() {
    if (!selectedMatchId || !selectedLang || !session?.user) return

    try {
      const res = await fetch('/api/streams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: parseInt(selectedMatchId, 10),
          langCode: selectedLang,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Failed to start stream')
        return
      }

      const data = await res.json()
      setMountPoint(data.mountPoint)
      setHlsUrl(data.hlsUrl)
      setStreamId(data.id)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const wsUrl = `wss://${window.location.host}/relay?mount=${data.mountPoint}&token=${data.relayToken}`

      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        const mr = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus',
        })
        mediaRecorderRef.current = mr

        mr.ondataavailable = (event) => {
          if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send(event.data)
          }
        }

        mr.start(250)
        setIsBroadcasting(true)
      }

      ws.onerror = () => {
        alert('WebSocket connection failed')
        stream.getTracks().forEach((t) => t.stop())
      }

      ws.onclose = () => {
        stream.getTracks().forEach((t) => t.stop())
        setIsBroadcasting(false)
      }
    } catch {
      alert('Microphone access denied or error starting stream')
    }
  }

  async function stopBroadcast() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }

    if (wsRef.current) {
      wsRef.current.close()
    }

    if (streamId) {
      await fetch(`/api/streams/${streamId}`, { method: 'DELETE' })
    }

    setIsBroadcasting(false)
    setMountPoint('')
    setHlsUrl('')
    setStreamId('')
  }

  if (status === 'loading') {
    return <div className="text-sm text-muted py-8 text-center">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-lg font-500 text-fg mb-1">Go live</h1>
        <p className="text-sm text-muted">
          Select a match and language, then start your broadcast.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-500 text-fg block mb-1.5">
            Match
          </label>
          <select
            value={selectedMatchId}
            onChange={(e) => setSelectedMatchId(e.target.value)}
            disabled={isBroadcasting}
            className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
            style={{ borderRadius: 8 }}
          >
            <option value="">Select a match...</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>
                {m.home} vs {m.away} — {m.group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-500 text-fg block mb-1.5">
            Language
          </label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            disabled={isBroadcasting}
            className="w-full border border-border bg-transparent text-sm text-fg px-3 py-2"
            style={{ borderRadius: 8 }}
          >
            <option value="">Select language...</option>
            {languages.map((lang: Language) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        {!isBroadcasting ? (
          <button
            onClick={startBroadcast}
            disabled={!selectedMatchId || !selectedLang}
            className="text-sm font-500 text-white bg-accent px-6 py-2 disabled:opacity-40"
            style={{ borderRadius: 8 }}
          >
            Start broadcast
          </button>
        ) : (
          <button
            onClick={stopBroadcast}
            className="text-sm font-500 text-white bg-live-red px-6 py-2"
            style={{ borderRadius: 8 }}
          >
            End broadcast
          </button>
        )}
      </div>

      {isBroadcasting && (
        <div className="border border-accent p-4 space-y-2" style={{ borderRadius: 8 }}>
          <div className="flex items-center gap-2 text-accent">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-500">LIVE — {mountPoint}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}${hlsUrl}`}
              className="flex-1 text-xs text-muted bg-transparent border border-border px-2 py-1.5"
              style={{ borderRadius: 4 }}
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}${hlsUrl}`
                )
              }
              className="text-xs font-500 text-accent border border-accent px-3 py-1.5 bg-transparent"
              style={{ borderRadius: 6 }}
            >
              Copy URL
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
