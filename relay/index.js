const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');

const PORT = parseInt(process.env.PORT || '3001', 10);
const JWT_SECRET = process.env.RELAY_JWT_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret';
const ICECAST_HOST = process.env.ICECAST_HOST || 'localhost';
const ICECAST_PORT = process.env.ICECAST_PORT || '8000';
const ICECAST_SOURCE_PASSWORD = process.env.ICECAST_SOURCE_PASSWORD || 'changeme';

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  const url = new URL(req.url || '', 'http://localhost');
  const token = url.searchParams.get('token');
  const mount = url.searchParams.get('mount');

  if (!token || !mount) {
    ws.close(4001, 'Missing token or mount');
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    ws.close(4002, 'Invalid token');
    return;
  }

  if (payload.mount !== mount) {
    ws.close(4003, 'Mount mismatch');
    return;
  }

  console.log(`Relay started: mount=${mount}, user=${payload.sub}`);

  const ffmpeg = spawn('ffmpeg', [
    '-i', 'pipe:0',
    '-f', 's16le',
    '-acodec', 'pcm_s16le',
    '-ar', '44100',
    '-ac', '1',
    '-f', 'mp3',
    '-ab', '128k',
    'icecast://source:' + ICECAST_SOURCE_PASSWORD + '@' + ICECAST_HOST + ':' + ICECAST_PORT + '/' + mount,
  ]);

  let audioBuffer = [];

  ffmpeg.stdin.on('error', () => {});

  ws.on('message', (data) => {
    audioBuffer.push(data);
    if (audioBuffer.length > 1) {
      const chunk = Buffer.concat(audioBuffer);
      audioBuffer = [];
      ffmpeg.stdin.write(chunk);
    }
  });

  const flushInterval = setInterval(() => {
    if (audioBuffer.length > 0) {
      const chunk = Buffer.concat(audioBuffer);
      audioBuffer = [];
      ffmpeg.stdin.write(chunk);
    }
  }, 1000);

  ws.on('close', () => {
    clearInterval(flushInterval);
    if (audioBuffer.length > 0) {
      const chunk = Buffer.concat(audioBuffer);
      ffmpeg.stdin.write(chunk);
    }
    ffmpeg.stdin.end();
    ffmpeg.kill();
    console.log(`Relay ended: mount=${mount}`);
  });

  ws.on('error', () => {
    clearInterval(flushInterval);
    ffmpeg.stdin.end();
    ffmpeg.kill();
  });
});

server.listen(PORT, () => {
  console.log(`Relay service listening on port ${PORT}`);
});
