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
  const streamRef = useRef<MediaStream | null>(null)
  const startTimeRef = useRef<number>(0)
  const timerRef = useRef<number | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatchId, setSelectedMatchId] = useState<string>('')
  const [selectedLang, setSelectedLang] = useState<string>('')
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mountPoint, setMountPoint] = useState<string>('')
  const [streamUrl, setStreamUrl] = useState<string>('')
  const [streamId, setStreamId] = useState<string>('')
  const [elapsed, setElapsed] = useState(0)
  const [relayToken, setRelayToken] = useState('')

  const selectedMatch = matches.find((m) => m.id.toString() === selectedMatchId)

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

  useEffect(() => {
    if (isBroadcasting && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 1000)
    }
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current)
    }
  }, [isBroadcasting, isPaused])

  function formatElapsed(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function getMatchMinute() {
    if (!selectedMatch) return null
    const kickoff = new Date(selectedMatch.kickoffUtc).getTime()
    const now = Date.now()
    const diff = Math.floor((now - kickoff) / 60000)
    if (diff < 0) return null
    if (diff > 105) return `HT`
    if (diff > 90) return `90+${diff - 90}'`
    if (diff > 45) return `${diff}'`
    return `${diff}'`
  }

  function connectRelay(token: string, mount: string) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.host}/relay?mount=${mount}&token=${token}`

    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      const mr = new MediaRecorder(streamRef.current!, {
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
      setIsPaused(false)
    }

    ws.onerror = () => {
      alert('Relay connection failed. Make sure the relay service is running.')
    }

    ws.onclose = () => {
      setIsBroadcasting(false)
      setIsPaused(false)
    }
  }

  async function startBroadcast() {
    if (!selectedMatchId || !selectedLang || !session?.user) return

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
    setStreamId(data.id)
    setStreamUrl(data.mp3Url)
    setRelayToken(data.relayToken)

    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
    } catch {
      alert('Microphone access denied. Please allow microphone permission.')
      return
    }

    startTimeRef.current = Date.now()
    setElapsed(0)
    connectRelay(data.relayToken, data.mountPoint)
  }

  function pauseBroadcast() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    if (wsRef.current) {
      wsRef.current.close()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.enabled = false)
    }
    setIsPaused(true)
  }

  function resumeBroadcast() {
    if (!relayToken || !mountPoint) return

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream
        stream.getTracks().forEach((t) => t.enabled = true)
        connectRelay(relayToken, mountPoint)
      })
      .catch(() => {
        alert('Microphone access denied on resume.')
      })
  }

  async function stopBroadcast() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }

    if (wsRef.current) {
      wsRef.current.close()
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }

    if (streamId) {
      await fetch(`/api/streams/${streamId}`, { method: 'DELETE' })
    }

    setIsBroadcasting(false)
    setIsPaused(false)
    setMountPoint('')
    setStreamUrl('')
    setStreamId('')
    setElapsed(0)
    setRelayToken('')
  }

  if (status === 'loading') {
    return <div className="text-sm text-muted py-8 text-center">Loading...</div>
  }

  if (status === 'unauthenticated') {
    return null
  }

  const matchMinute = getMatchMinute()

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
          <label className="text-sm font-500 text-fg block mb-1.5">Match</label>
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
          <label className="text-sm font-500 text-fg block mb-1.5">Language</label>
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

      {!isBroadcasting && !isPaused && (
        <button
          onClick={startBroadcast}
          disabled={!selectedMatchId || !selectedLang}
          className="text-sm font-500 text-white bg-accent px-6 py-2 disabled:opacity-40"
          style={{ borderRadius: 8 }}
        >
          Start broadcast
        </button>
      )}

      {(isBroadcasting || isPaused) && (
        <div className="border border-accent p-4 space-y-3" style={{ borderRadius: 8 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isPaused ? (
                <span className="w-2 h-2 bg-muted rounded-full" />
              ) : (
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              )}
              <span className="text-sm text-fg font-500">
                {isPaused ? 'PAUSED' : 'LIVE'}
              </span>
              {matchMinute !== null && (
                <span className="text-xs text-muted border border-border px-2 py-0.5" style={{ borderRadius: 4 }}>
                  {matchMinute}
                </span>
              )}
              <span className="text-xs text-muted font-mono tabular-nums">
                {formatElapsed(elapsed)}
              </span>
            </div>
            <span className="text-xs text-muted truncate max-w-[200px]">{mountPoint}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={`${window.location.origin}${streamUrl}`}
              className="flex-1 text-xs text-muted bg-transparent border border-border px-2 py-1.5"
              style={{ borderRadius: 4 }}
            />
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}${streamUrl}`
                )
              }
              className="text-xs font-500 text-accent border border-accent px-3 py-1.5 bg-transparent"
              style={{ borderRadius: 6 }}
            >
              Copy URL
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            {isPaused ? (
              <button
                onClick={resumeBroadcast}
                className="text-sm font-500 text-white bg-accent px-4 py-2"
                style={{ borderRadius: 8 }}
              >
                Resume
              </button>
            ) : (
              <button
                onClick={pauseBroadcast}
                className="text-sm font-500 text-muted border border-border px-4 py-2 bg-transparent"
                style={{ borderRadius: 8 }}
              >
                Pause
              </button>
            )}
            <button
              onClick={stopBroadcast}
              className="text-sm font-500 text-white bg-live-red px-4 py-2"
              style={{ borderRadius: 8 }}
            >
              End broadcast
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
