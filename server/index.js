/**
 * 100oku Desire 簡易バックエンド
 * BACKEND_DESIGN: POST /api/play, GET /api/analytics, JSON 永続化
 */

import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const PLAYS_PATH = path.join(DATA_DIR, 'plays.json')
const CARDS_MASTER_PATH = path.join(DATA_DIR, 'cards-master.json')

const PORT = Number(process.env.PORT) || 3001

const CATEGORY_LABELS = {
  community: '地域貢献',
  experience: '体験',
  investment: '投資',
  asset: '資産形成',
}

function readPlays() {
  try {
    const raw = fs.readFileSync(PLAYS_PATH, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writePlays(plays) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(PLAYS_PATH, JSON.stringify(plays, null, 2), 'utf8')
}

function readCardsMaster() {
  try {
    const raw = fs.readFileSync(CARDS_MASTER_PATH, 'utf8')
    const arr = JSON.parse(raw)
    const map = {}
    for (const c of arr) {
      if (c.id != null) map[c.id] = c.title || c.id
    }
    return map
  } catch {
    return {}
  }
}

const app = express()

// GitHub Pages（https://k5-dom.github.io など）やローカル開発からのアクセスを許可する CORS 設定
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://k5-dom.github.io',
]

app.use(
  cors({
    origin(origin, callback) {
      // curl や Postman など Origin ヘッダが付かない場合は許可
      if (!origin) return callback(null, true)
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true)
      return callback(null, false)
    },
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/stats', (_req, res) => {
  const plays = readPlays()
  res.json({ totalPlays: plays.length })
})

app.post('/api/play', (req, res) => {
  const body = req.body || {}
  const { selectedCardIds, categoryScores, result } = body

  if (!Array.isArray(selectedCardIds) || typeof categoryScores !== 'object' || categoryScores === null || !result) {
    return res.status(400).json({ ok: false, message: 'selectedCardIds, categoryScores, result are required' })
  }

  const record = {
    ageGroup: body.ageGroup ?? null,
    gender: body.gender ?? null,
    location: body.location ?? null,
    selectedCardIds,
    categoryScores,
    result,
    balance: typeof body.balance === 'number' ? body.balance : 0,
    submittedAt: body.submittedAt || new Date().toISOString(),
  }

  const plays = readPlays()
  plays.push(record)
  writePlays(plays)

  res.status(201).json({ ok: true, message: 'saved' })
})

app.get('/api/analytics', (_req, res) => {
  const plays = readPlays()
  const cardTitles = readCardsMaster()

  const categoryTotal = {}
  let totalPicks = 0

  for (const play of plays) {
    const scores = play.categoryScores || {}
    for (const [rawCat, count] of Object.entries(scores)) {
      const n = Number(count) || 0
      if (!n) continue
      // 「欲望」は「体験」に統合
      const cat = rawCat === 'desire' ? 'experience' : rawCat
      categoryTotal[cat] = (categoryTotal[cat] || 0) + n
      totalPicks += n
    }
  }

  const categoryRates = Object.entries(CATEGORY_LABELS).map(([categoryId, label]) => {
    const count = categoryTotal[categoryId] || 0
    const rate = totalPicks > 0 ? count / totalPicks : 0
    return { categoryId, label, rate }
  })

  const communityEntry = categoryRates.find((r) => r.categoryId === 'community')
  const communityPickRate = communityEntry ? communityEntry.rate : 0

  const cardCounts = {}
  for (const play of plays) {
    const ids = play.selectedCardIds || []
    for (const id of ids) {
      cardCounts[id] = (cardCounts[id] || 0) + 1
    }
  }

  const sorted = Object.entries(cardCounts)
    .map(([id, pickCount]) => ({ id, title: cardTitles[id] || id, pickCount }))
    .sort((a, b) => b.pickCount - a.pickCount)
    .slice(0, 5)
    .map((c, i) => ({ rank: i + 1, title: c.title, pickCount: c.pickCount }))

  res.json({
    categoryRates,
    communityPickRate,
    popularCards: sorted,
  })
})

const server = app.listen(PORT, () => {
  console.log(`100oku Desire API: http://localhost:${PORT} or http://<IP address>:${PORT}`)
})
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallback = PORT + 1
    server.close(() => {
      const s2 = http.createServer(app)
      s2.listen(fallback, () => {
        console.log(`Port ${PORT} was in use. Using: http://localhost:${fallback}`)
      })
      s2.on('error', (e2) => {
        console.error(`Port ${fallback} also in use:`, e2.message)
        process.exit(1)
      })
    })
  } else {
    throw err
  }
})
