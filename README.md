# Ertemol

Amateur live commentary platform for the 2026 FIFA World Cup.

Visitors pick a commentary language and a match, then listen to volunteer commentators via HLS audio. The stream URL works in VLC so viewers can watch 4K video from any source and overlay Ertemol's audio. Commentators sign in with Google and broadcast directly from the browser microphone.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Database:** PostgreSQL 16 + Prisma 5 ORM
- **Cache / Pub-Sub:** Redis 7 (ioredis)
- **Audio Server:** Icecast2 (Docker) — serves HLS + MP3 streams
- **Relay Service:** Node.js 20 — WebSocket audio chunks → ffmpeg → Icecast
- **Auth:** NextAuth.js v5 with Google provider
- **Infrastructure:** Hetzner VPS, Dokploy (Docker Compose)

## Project Structure

```
ertemol/
├── docker-compose.yml          # All services
├── Dockerfile                  # Next.js multi-stage build
├── .env.example                # Environment variables template
├── prisma/
│   └── schema.prisma           # Database schema
├── scripts/
│   ├── seed-fixtures.ts        # Seed 104 matches from openfootball
│   └── sync-fixtures.ts        # Live score sync from API-Football
├── relay/
│   ├── Dockerfile              # Relay service build
│   ├── package.json
│   └── index.js                # WebSocket → ffmpeg → Icecast
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + Nav
│   │   ├── page.tsx            # Home: language grid + match list
│   │   ├── providers.tsx       # Session provider
│   │   ├── globals.css         # Tailwind + Inter font
│   │   ├── broadcast/
│   │   │   └── page.tsx        # Go live page
│   │   └── api/
│   │       ├── auth/           # NextAuth Google OAuth
│   │       ├── matches/        # GET today's matches
│   │       ├── matches/[id]/streams/  # GET streams for match+lang
│   │       ├── streams/        # POST start stream
│   │       ├── streams/[id]/   # DELETE end stream
│   │       ├── streams/[id]/vote/  # POST vote
│   │       ├── events/         # SSE (listener counts, votes, match status)
│   │       └── stream-token/   # GET short-lived JWT
│   ├── lib/
│   │   ├── languages.ts        # 20 supported languages
│   │   ├── prisma.ts           # Prisma singleton
│   │   ├── redis.ts            # Redis singleton
│   │   └── auth.ts             # NextAuth config
│   └── components/
│       ├── Nav.tsx
│       ├── LanguageGrid.tsx
│       ├── MatchList.tsx
│       └── SpeakerPanel.tsx
└── README.md
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `DB_PASS` | PostgreSQL password |
| `REDIS_URL` | Redis connection string |
| `NEXTAUTH_URL` | App URL (https://ertemol.com) |
| `NEXTAUTH_SECRET` | Random 32-char base64 string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `ICECAST_SOURCE_PASSWORD` | Icecast source password |
| `ICECAST_ADMIN_PASSWORD` | Icecast admin password |
| `API_FOOTBALL_KEY` | API-Football API key |

## Getting Started

### Local development

```bash
# Install dependencies
npm install

# Start PostgreSQL and Redis
docker compose up -d db redis

# Set up database
cp .env.example .env  # fill in your values
npx prisma db push
npx prisma db seed

# Start dev server
npm run dev
```

### Seed fixtures

```bash
npx tsx scripts/seed-fixtures.ts
```

### Sync live scores

```bash
API_FOOTBALL_KEY=your_key npx tsx scripts/sync-fixtures.ts
```

## Docker Compose Services

| Service | Description | Port |
|---------|-------------|------|
| `app` | Next.js application | 3000 |
| `relay` | WebSocket audio relay + ffmpeg | 3001 |
| `db` | PostgreSQL 16 | 5432 |
| `redis` | Redis 7 | 6379 |
| `icecast` | Icecast2 audio streaming | 8000 |

## Dokploy Deployment

1. Create Hetzner VPS (Ubuntu 22.04, 8 GB)
2. Point DNS (ertemol.com A → VPS IP)
3. Install Dokploy: `curl -sSL https://dokploy.com/install.sh | sh`
4. Open Dokploy UI → Add domain → Enable Let's Encrypt
5. New Project → Docker Compose → Connect GitHub repo
6. Set all environment variables
7. Add volumes: `postgres-data`, `icecast-logs`
8. Deploy

## Design System

- Background: `#FAFAFA`
- Text: `#111111`
- Muted: `#6B6B6B`
- Border: `#E5E5E5` (1px)
- Accent: `#16A34A` (green-600)
- Live: `#DC2626` (pulsing dot only)
- Font: Inter Variable (weights 400, 500)
- No shadows, no gradients, border-radius max 8px

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/matches` | — | Today's matches with stream counts |
| GET | `/api/matches/[id]/streams?lang=` | — | Active streams for match+language |
| POST | `/api/streams` | ✓ | Start stream → mountPoint + JWT |
| DELETE | `/api/streams/[id]` | ✓ own | End stream |
| POST | `/api/streams/[id]/vote` | ✓ | `{ value: 1 \| -1 }` |
| GET | `/api/events` | — | SSE realtime events |
| GET | `/api/stream-token` | ✓ | Short-lived JWT for relay |

## Languages (Launch — 20)

Turkish · Arabic · Persian · Spanish · Portuguese · French · German · Indonesian · Urdu · Bengali · Swahili · Dutch · Italian · Japanese · Korean · Russian · Polish · Romanian · Greek · Malay

## Audio Pipeline

```
Browser MediaRecorder (opus/webm, 250ms)
  → WebSocket → Relay Service
    → ffmpeg (webm → PCM 44100 → mp3 128k)
      → Icecast2
        → HLS: /stream/{mount}/index.m3u8
        → MP3: /stream/{mount}
```

## Fixture Data

- **Seed:** [openfootball/worldcup.json](https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json) — 104 matches, public domain, no API key
- **Live sync:** API-Football free tier (100 req/day) — updates match status/score/minute every 60s via cron
