import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const matchId = parseInt(params.id, 10)
  if (isNaN(matchId)) {
    return NextResponse.json({ error: 'Invalid match ID' }, { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams
  const lang = searchParams.get('lang')

  const where: {
    matchId: number
    endedAt: null
    langCode?: string
  } = {
    matchId,
    endedAt: null,
  }

  if (lang) {
    where.langCode = lang
  }

  const streams = await prisma.stream.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: { votes: true },
      },
    },
    orderBy: { score: 'desc' },
  })

  const result = streams.map((s) => ({
    id: s.id,
    langCode: s.langCode,
    mountPoint: s.mountPoint,
    startedAt: s.startedAt.toISOString(),
    listeners: s.listeners,
    score: s.score,
    user: s.user,
    voteCount: s._count.votes,
  }))

  return NextResponse.json(result)
}
