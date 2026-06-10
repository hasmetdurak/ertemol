import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

async function getUserWithStreams(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      displayName: true,
      image: true,
      bio: true,
      contactEmail: true,
      instagram: true,
      twitter: true,
      website: true,
      streams: {
        where: { endedAt: null },
        include: {
          match: {
            select: {
              id: true,
              home: true,
              away: true,
              group: true,
              kickoffUtc: true,
              status: true,
              scoreHome: true,
              scoreAway: true,
              minute: true,
            },
          },
        },
        orderBy: { score: 'desc' },
      },
      _count: {
        select: {
          votes: true,
        },
      },
    },
  })

  if (!user) return null
  return user
}

function formatLocalTime(utcDate: Date | string): string {
  const d = utcDate instanceof Date ? utcDate : new Date(utcDate)
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserWithStreams(params.id)

  if (!user) {
    notFound()
  }

  const displayName = user.displayName || user.name
  const initials = displayName
    ? displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  const totalVotes = user.streams.reduce((acc, s) => acc + s.score, 0)
  const avgScore = user.streams.length > 0 
    ? (totalVotes / user.streams.length).toFixed(1) 
    : '0.0'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 flex items-center justify-center text-xl font-medium"
          style={{
            backgroundColor: '#E8F5E9',
            color: '#16A34A',
            borderRadius: '50%',
          }}
        >
          {initials}
        </div>
        <div>
          <h1 className="text-xl font-500 text-fg">{displayName}</h1>
          {user.displayName && (
            <p className="text-sm text-muted">Real name: {user.name}</p>
          )}
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted">Average Score: {avgScore}</span>
            {user.contactEmail && (
              <a href={`mailto:${user.contactEmail}`} className="text-xs text-accent hover:underline">
                {user.contactEmail}
              </a>
            )}
          </div>
        </div>
      </div>

      {user.bio && (
        <div className="border border-border p-4" style={{ borderRadius: 8 }}>
          <p className="text-sm text-fg">{user.bio}</p>
        </div>
      )}

      {(user.instagram || user.twitter || user.website) && (
        <div className="border border-border p-4" style={{ borderRadius: 8 }}>
          <div className="text-xs font-500 text-muted uppercase mb-2">Social Links</div>
          <div className="flex flex-wrap gap-3">
            {user.instagram && (
              <a href={`https://instagram.com/${user.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                Instagram: {user.instagram}
              </a>
            )}
            {user.twitter && (
              <a href={`https://twitter.com/${user.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                Twitter: {user.twitter}
              </a>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                Website
              </a>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-sm font-500 text-muted uppercase mb-3">Active Commentaries</h2>
        {user.streams.length === 0 ? (
          <div className="text-sm text-muted">No active commentaries.</div>
        ) : (
          <div className="border border-border" style={{ borderRadius: 8 }}>
            {user.streams.map((stream) => (
              <div key={stream.id} className="p-3 border-b border-border last:border-b-0">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-fg">
                      {stream.match.home} vs {stream.match.away}
                    </span>
                    <span className="text-xs text-muted ml-2">({stream.match.group})</span>
                  </div>
                  <div className="text-xs text-muted">
                    {stream.match.status === '1H' || stream.match.status === '2H' || stream.match.status === 'HT' ? (
                      <span className="text-live-red">{stream.match.minute || stream.match.status}′</span>
                    ) : (
                      formatLocalTime(stream.match.kickoffUtc)
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted mt-1">
                  Listeners: {stream.listeners} • Score: {stream.score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
