import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const mount = searchParams.get('mount')
  const streamId = searchParams.get('streamId')

  const token = jwt.sign(
    { sub: session.user.id, mount, streamId },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '15m' }
  )

  return NextResponse.json({ token })
}
