function toISO(date, time, tzStr) {
  const tzMatch = tzStr.match(/UTC([+-]\d+)/)
  let offset = tzMatch ? -parseInt(tzMatch[1]) : -6
  const sign = offset < 0 ? "-" : "+"
  const off = String(Math.abs(offset)).padStart(2, "0")
  return new Date(date + "T" + time + ":00" + sign + off + ":00").toISOString()
}

const res = await fetch(
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json"
)
const data = await res.json()

const byDate = {}
let nextId = 1

for (const m of data.matches) {
  if (!m.date) continue
  const timeRaw = m.time || "20:00 UTC-6"
  const timeMatch = timeRaw.match(/(\d{2}:\d{2})/)
  const time = timeMatch ? timeMatch[1] : "20:00"
  const tzMatch = timeRaw.match(/UTC[+-]\d+/)
  const tzStr = tzMatch ? tzMatch[0] : "UTC-6"
  const kickoffUtc = toISO(m.date, time, tzStr)
  const id = nextId++

  if (!byDate[m.date]) byDate[m.date] = []
  byDate[m.date].push({
    id,
    home: m.team1,
    away: m.team2,
    group: m.group || m.round || "Group Stage",
    stage: m.group
      ? "group"
      : (m.round || "").toLowerCase().includes("final")
        ? "final"
        : "knockout",
    kickoffUtc,
    venue: m.ground || null,
    city: m.city || null,
  })
}

const sortedDates = Object.keys(byDate).sort()

let output = `import type { FixtureData } from "./fixtures"\n\n`
output += `export const fixturesByDate: Record<string, FixtureData[]> = {\n`

for (const date of sortedDates) {
  const matches = byDate[date]
  output += `  "${date}": [\n`
  for (const m of matches) {
    output += `    { id: ${m.id}, home: "${m.home}", away: "${m.away}", group: "${m.group}", stage: "${m.stage}", kickoffUtc: "${m.kickoffUtc}", status: "NS", scoreHome: null, scoreAway: null, minute: null, venue: ${JSON.stringify(m.venue)}, city: ${JSON.stringify(m.city)}, streamCountByLang: {}, totalStreams: 0 },\n`
  }
  output += "  ],\n"
}

output += `};\n\n`
output += `export function getFixturesForDate(dateStr: string): FixtureData[] {\n`
output += `  if (fixturesByDate[dateStr]) return fixturesByDate[dateStr]\n`
output += `  const allDates = Object.keys(fixturesByDate)\n`
output += `  if (allDates.length === 0) return []\n`
output += `  return fixturesByDate[allDates[0]]\n`
output += `}\n`

console.log(output)
