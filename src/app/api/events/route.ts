import { NextRequest } from 'next/server'
import { redis } from '@/lib/redis'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('retry: 3000\n\n'))

      const subscriber = redis.duplicate()
      await subscriber.connect()

      await subscriber.subscribe('events')

      subscriber.on('message', (_channel: string, message: string) => {
        try {
          const data = JSON.parse(message)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        } catch {
        }
      })

      request.signal.addEventListener('abort', () => {
        subscriber.unsubscribe('events')
        subscriber.disconnect()
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
