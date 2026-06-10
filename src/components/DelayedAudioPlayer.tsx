'use client'

import { useEffect, useRef, useState } from 'react'

export function DelayedAudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const delayNodeRef = useRef<DelayNode | null>(null)
  const [delaySeconds, setDelaySeconds] = useState(0)
  const [supportNotice, setSupportNotice] = useState(false)

  useEffect(() => {
    let ctx: AudioContext | null = null
    let source: MediaElementAudioSourceNode | null = null
    let delayNode: DelayNode | null = null

    const setupAudio = async () => {
      if (!audioRef.current) return

      try {
        ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        audioContextRef.current = ctx
        source = ctx.createMediaElementSource(audioRef.current)
        sourceRef.current = source
        delayNode = ctx.createDelay(60)
        delayNodeRef.current = delayNode
        delayNode.delayTime.value = 0

        source.connect(delayNode).connect(ctx.destination)
      } catch {
        setSupportNotice(true)
      }
    }

    setupAudio()

    return () => {
      if (source) source.disconnect()
      if (delayNode) delayNode.disconnect()
      if (ctx) ctx.close()
    }
  }, [src])

  useEffect(() => {
    if (delayNodeRef.current) {
      delayNodeRef.current.delayTime.value = delaySeconds
    }
  }, [delaySeconds])

  function addDelay(seconds: number) {
    setDelaySeconds((prev) => Math.min(prev + seconds, 60))
  }

  function resetDelay() {
    setDelaySeconds(0)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-muted w-12">Audio Delay:</span>
        <button
          onClick={() => addDelay(1)}
          className="h-[24px] px-2 inline-flex items-center text-[11px] font-medium border border-border bg-white text-fg hover:bg-bg transition-colors"
          style={{ borderRadius: 4 }}
        >
          +1s
        </button>
        <button
          onClick={() => addDelay(5)}
          className="h-[24px] px-2 inline-flex items-center text-[11px] font-medium border border-border bg-white text-fg hover:bg-bg transition-colors"
          style={{ borderRadius: 4 }}
        >
          +5s
        </button>
        <button
          onClick={() => addDelay(10)}
          className="h-[24px] px-2 inline-flex items-center text-[11px] font-medium border border-border bg-white text-fg hover:bg-bg transition-colors"
          style={{ borderRadius: 4 }}
        >
          +10s
        </button>
        {delaySeconds > 0 && (
          <>
            <span className="text-xs font-mono text-accent ml-1">{delaySeconds}s</span>
            <button
              onClick={resetDelay}
              className="h-[24px] px-2 inline-flex items-center text-[11px] font-medium border border-border bg-white text-muted hover:text-fg transition-colors"
              style={{ borderRadius: 4 }}
            >
              Reset
            </button>
          </>
        )}
      </div>

      <audio ref={audioRef} controls className="w-full h-9 accent-accent" style={{ borderRadius: 4 }}>
        <source src={src} type="audio/mpeg" />
      </audio>

      {supportNotice && (
        <p className="text-[10px] text-muted">
          Audio delay requires Web Audio API. Use VLC for native delay control.
        </p>
      )}
    </div>
  )
}