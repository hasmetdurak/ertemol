import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      displayName: true,
      bio: true,
      contactEmail: true,
      instagram: true,
      twitter: true,
      website: true,
    },
  })

  return NextResponse.json(user)
}

export async function PATCH(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const {
    displayName,
    bio,
    contactEmail,
    instagram,
    twitter,
    website,
  } = body

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      displayName,
      bio,
      contactEmail,
      instagram,
      twitter,
      website,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      displayName: true,
      bio: true,
      contactEmail: true,
      instagram: true,
      twitter: true,
      website: true,
    },
  })

  return NextResponse.json(user)
}