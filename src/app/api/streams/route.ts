import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { matchId, langCode } = body

  if (!matchId || !langCode) {
    return NextResponse.json({ error: 'matchId and langCode required' }, { status: 400 })
  }

  const activeStream = await prisma.stream.findFirst({
    where: {
      userId: session.user.id,
      endedAt: null,
    },
  })

  if (activeStream) {
    return NextResponse.json(
      { error: 'You already have an active stream' },
      { status: 409 }
    )
  }

  const match = await prisma.match.findUnique({
    where: { id: parseInt(matchId, 10) },
  })

  if (!match) {
    return NextResponse.json({ error: 'Match not found' }, { status: 404 })
  }

  const mountId = uuidv4().slice(0, 8)
  const mountPoint = `${langCode}-${matchId}-${mountId}`

  const stream = await prisma.stream.create({
    data: {
      userId: session.user.id,
      matchId: parseInt(matchId, 10),
      langCode,
      mountPoint,
    },
  })

  const relayToken = jwt.sign(
    {
      sub: session.user.id,
      mount: mountPoint,
      streamId: stream.id,
    },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '15m' }
  )

  return NextResponse.json({
    id: stream.id,
    mountPoint,
    relayToken,
    hlsUrl: `/stream/${mountPoint}/index.m3u8`,
    mp3Url: `/stream/${mountPoint}`,
  })
}
