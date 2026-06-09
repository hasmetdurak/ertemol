import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redis } from '@/lib/redis'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { value } = body

  if (value !== 1 && value !== -1) {
    return NextResponse.json({ error: 'Value must be 1 or -1' }, { status: 400 })
  }

  const streamId = params.id

  const stream = await prisma.stream.findUnique({
    where: { id: streamId },
  })

  if (!stream || stream.endedAt) {
    return NextResponse.json({ error: 'Stream not found or ended' }, { status: 404 })
  }

  const dedupKey = `vote:${session.user.id}:${streamId}`
  const existing = await redis.get(dedupKey)

  if (existing) {
    return NextResponse.json({ error: 'Already voted' }, { status: 429 })
  }

  await redis.set(dedupKey, value, 'EX', 86400)

  await prisma.vote.create({
    data: {
      userId: session.user.id,
      streamId,
      value,
    },
  })

  await prisma.stream.update({
    where: { id: streamId },
    data: { score: { increment: value } },
  })

  const publisher = redis.duplicate()
  await publisher.publish(
    'events',
    JSON.stringify({ type: 'vote', streamId, value, newScore: stream.score + value })
  )
  publisher.disconnect()

  return NextResponse.json({ success: true, newScore: stream.score + value })
}
