import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function sync() {
  const KEY = process.env.API_FOOTBALL_KEY
  if (!KEY) {
    console.warn('API_FOOTBALL_KEY not set, skipping sync')
    return
  }

  const today = new Date().toISOString().slice(0, 10)
  const url = `https://v3.football.api-sports.io/fixtures?league=1&season=2026&date=${today}`

  const res = await fetch(url, {
    headers: { 'x-apisports-key': KEY },
  })

  if (!res.ok) {
    console.warn(`API-Football returned ${res.status}, skipping sync`)
    return
  }

  const data = await res.json()
  const fixtures = data.response || []

  for (const f of fixtures) {
    const fixture = f.fixture
    const goals = f.goals
    const status = fixture.status

    await prisma.match.updateMany({
      where: { id: fixture.id },
      data: {
        status: status.short,
        scoreHome: goals.home,
        scoreAway: goals.away,
        minute: status.elapsed?.toString() ?? null,
      },
    })
  }

  console.log(`Synced ${fixtures.length} fixtures at ${new Date().toISOString()}`)
}

sync()
  .catch((e) => console.error('Sync error:', e))
  .finally(() => prisma.$disconnect())
