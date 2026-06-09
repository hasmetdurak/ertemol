'use client'

interface DateBarProps {
  selectedDate: string
  onDateChange: (dateStr: string) => void
  dates: string[]
}

function formatDateLabel(dateStr: string): { weekday: string; dayMonth: string } {
  const d = new Date(dateStr + 'T12:00:00Z')
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' })
  const dayMonth = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' })
  return { weekday, dayMonth }
}

function isToday(dateStr: string): boolean {
  return dateStr === new Date().toISOString().slice(0, 10)
}

export function DateBar({ selectedDate, onDateChange, dates }: DateBarProps) {
  return (
    <div className="w-full border-b border-border bg-white mb-6">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-1 overflow-x-auto h-[48px]" style={{ scrollbarWidth: 'none' }}>
        {dates.map((dateStr) => {
          const isSelected = selectedDate === dateStr
          const { weekday, dayMonth } = formatDateLabel(dateStr)
          const today = isToday(dateStr)

          return (
            <button
              key={dateStr}
              onClick={() => onDateChange(dateStr)}
              className={`h-[36px] px-4 flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-all focus:outline-none ${
                isSelected
                  ? 'bg-[#F0FDF4] text-accent border border-accent font-semibold'
                  : 'text-muted hover:text-fg hover:bg-bg'
              }`}
              style={{ borderRadius: 6 }}
            >
              <span>{weekday},</span>
              <span className={isSelected ? 'text-accent' : 'text-fg'}>{dayMonth}</span>
              {today && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-accent" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
