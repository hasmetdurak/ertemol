import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Fetching fixtures from openfootball/worldcup.json...')
  const res = await fetch(
    'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json'
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  let count = 0

  for (const round of data.rounds) {
    const roundName = round.name
    const isGroup = roundName.toLowerCase().includes('group')
    const stage = isGroup ? 'group' : roundName.toLowerCase().includes('final') ? 'final' : 'knockout'

    for (const match of round.matches) {
      const matchId = match.num
      if (!matchId) continue

      const kickoffStr = match.date + 'T' + (match.time || '20:00') + ':00Z'
      const kickoffUtc = new Date(kickoffStr)

      await prisma.match.upsert({
        where: { id: matchId },
        update: {},
        create: {
          id: matchId,
          home: match.team1?.name || 'TBD',
          away: match.team2?.name || 'TBD',
          group: roundName,
          stage,
          kickoffUtc,
          venue: match.stadium?.name ?? null,
          city: match.city ?? null,
        },
      })
      count++
    }
  }

  console.log(`Seeded ${count} fixtures successfully.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
