'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { DateBar } from '@/components/DateBar'
import { MatchList } from '@/components/MatchList'
import { allMatchDates } from '@/lib/match-dates'

interface Match {
  id: number
  home: string
  away: string
  group: string
  stage: string
  kickoffUtc: string
  status: string
  scoreHome: number | null
  scoreAway: number | null
  minute: string | null
  venue: string | null
  city: string | null
  streamCountByLang: Record<string, number>
  totalStreams: number
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z')
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${dayNames[d.getUTCDay()]}, ${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/matches?date=${selectedDate}`)
      const data = await res.json()
      setMatches(data)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  useEffect(() => {
    const interval = setInterval(fetchMatches, 60000)
    return () => clearInterval(interval)
  }, [fetchMatches])

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col items-center text-center pb-4 sm:pb-6 border-b border-border">
        <Image
          src="/logo.svg"
          alt="Ertemol"
          width={360}
          height={144}
          className="w-[260px] sm:w-[320px] md:w-[360px] h-auto mb-3 sm:mb-4"
          priority
        />
        <p className="text-sm sm:text-base text-muted max-w-md px-4">
          Pick a match, choose a language, and listen to live commentary
          from volunteers around the world.
        </p>
        <p className="text-xs sm:text-sm text-muted mt-2 font-medium">
          {formatDate(selectedDate)}
        </p>
      </div>

      <DateBar selectedDate={selectedDate} onDateChange={setSelectedDate} dates={allMatchDates} />

      {loading ? (
        <div className="text-sm text-muted py-8 text-center">Loading fixtures...</div>
      ) : matches.length === 0 ? (
        <div className="border border-border p-8 text-center text-sm text-muted">
          No matches scheduled for this day.
        </div>
      ) : (
        <MatchList matches={matches} />
      )}
    </div>
  )
}
