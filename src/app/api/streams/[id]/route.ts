import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stream = await prisma.stream.findUnique({
    where: { id: params.id },
  })

  if (!stream) {
    return NextResponse.json({ error: 'Stream not found' }, { status: 404 })
  }

  if (stream.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.stream.update({
    where: { id: params.id },
    data: { endedAt: new Date() },
  })

  return NextResponse.json({ success: true })
}
