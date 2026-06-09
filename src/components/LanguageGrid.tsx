'use client'

import { useState, useEffect } from 'react'
import { languages } from '@/lib/languages'
import { SpeakerPanel } from './SpeakerPanel'

interface LanguageGridProps {
  matchId: number
}

export function LanguageGrid({ matchId }: LanguageGridProps) {
  const [selectedLang, setSelectedLang] = useState<string | null>('TR')
  const [langCounts, setLangCounts] = useState<Record<string, number>>({
    TR: 3,
    ES: 1,
    FR: 2,
  })
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch(`/api/matches/${matchId}/streams`)
        if (!res.ok) return
        const streams: { langCode: string }[] = await res.json()
        const counts: Record<string, number> = {}
        for (const s of streams) {
          counts[s.langCode] = (counts[s.langCode] || 0) + 1
        }
        if (Object.keys(counts).length > 0) {
          setLangCounts(counts)
        }
      } catch {
      }
    }
    fetchCounts()
  }, [matchId])

  const activeLanguages = languages.filter(
    (lang) => (langCounts[lang.code] || 0) > 0
  )

  const displayedLanguages = showAll ? languages : activeLanguages

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {displayedLanguages.map((lang) => {
          const liveCount = langCounts[lang.code] || 0
          const isSelected = selectedLang === lang.code
          const hasLive = liveCount > 0

          return (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(isSelected ? null : lang.code)}
              className={`h-[36px] px-3 flex items-center gap-2 border text-xs font-medium transition-all ${
                isSelected
                  ? 'border-accent bg-[#F0FDF4] text-accent ring-1 ring-accent'
                  : hasLive
                    ? 'border-fg bg-white text-fg hover:border-accent hover:text-accent'
                    : 'border-border bg-white text-muted opacity-60 hover:opacity-100'
              }`}
              style={{ borderRadius: 6 }}
            >
              <span className="text-sm">{lang.flag}</span>
              <span>{lang.code}</span>
              {liveCount > 0 && (
                <span
                  className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono ${
                    isSelected
                      ? 'bg-accent text-white'
                      : 'bg-bg text-accent border border-border'
                  }`}
                  style={{ borderRadius: 4 }}
                >
                  {liveCount}
                </span>
              )}
            </button>
          )
        })}

        {!showAll && languages.length > activeLanguages.length && (
          <button
            onClick={() => setShowAll(true)}
            className="h-[36px] px-3 flex items-center justify-center border border-dashed border-border text-xs text-muted hover:border-muted hover:text-fg transition-all bg-white"
            style={{ borderRadius: 6 }}
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            More Languages
          </button>
        )}

        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="h-[36px] px-3 flex items-center justify-center text-xs text-muted hover:text-fg transition-all"
          >
            Show Less
          </button>
        )}
      </div>

      {selectedLang && (
        <div className="border border-border bg-white p-4 mt-2" style={{ borderRadius: 6 }}>
          <SpeakerPanel matchId={matchId} langCode={selectedLang} />
        </div>
      )}
    </div>
  )
}
