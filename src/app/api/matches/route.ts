import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getFixturesForDate } from '@/lib/fixtures'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date') || new Date().toISOString().slice(0, 10)

  const startOfDay = new Date(date + 'T00:00:00.000Z')
  const endOfDay = new Date(date + 'T23:59:59.999Z')

  try {
    const matches = await prisma.match.findMany({
      where: {
        kickoffUtc: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        streams: {
          where: { endedAt: null },
          select: {
            langCode: true,
            _count: { select: { votes: true } },
          },
        },
      },
      orderBy: { kickoffUtc: 'asc' },
    })

    if (matches.length > 0) {
      const result = matches.map((match) => {
        const streamCountByLang: Record<string, number> = {}
        for (const s of match.streams) {
          streamCountByLang[s.langCode] = (streamCountByLang[s.langCode] || 0) + 1
        }
        return {
          id: match.id,
          home: match.home,
          away: match.away,
          group: match.group,
          stage: match.stage,
          kickoffUtc: match.kickoffUtc.toISOString(),
          status: match.status,
          scoreHome: match.scoreHome,
          scoreAway: match.scoreAway,
          minute: match.minute,
          venue: match.venue,
          city: match.city,
          streamCountByLang,
          totalStreams: match.streams.length,
        }
      })
      return NextResponse.json(result)
    }
  } catch {
  }

  return NextResponse.json(getFixturesForDate(date))
}
