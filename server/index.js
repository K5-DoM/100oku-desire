import cors from 'cors'
import express from 'express'
import fs from 'fs'
import http from 'http'
import path from 'path'
import pg from 'pg'
import { fileURLToPath } from 'url'

const { Pool } = pg

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const PLAYS_PATH = path.join(DATA_DIR, 'plays.json')
const CARDS_MASTER_PATH = path.join(DATA_DIR, 'cards-master.json')
const PORT = Number(process.env.PORT) || 3001

const CATEGORY_LABELS = {
  community: 'Community',
  experience: 'Experience',
  investment: 'Investment',
  asset: 'Asset',
}

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://k5-dom.github.io',
]

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

function readPlaysFromFile() {
  try {
    const raw = fs.readFileSync(PLAYS_PATH, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function writePlaysToFile(plays) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(PLAYS_PATH, JSON.stringify(plays, null, 2), 'utf8')
}

function normalizePlayRow(play) {
  return {
    selectedCardIds: Array.isArray(play.selected_card_ids) ? play.selected_card_ids : [],
    categoryScores: play.category_scores && typeof play.category_scores === 'object' ? play.category_scores : {},
  }
}

async function createStorage() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.log('[storage] DATABASE_URL not set. Using JSON file storage.')
    return {
      mode: 'file',
      async getPlays() {
        return readPlaysFromFile()
      },
      async savePlay(record) {
        const plays = readPlaysFromFile()
        plays.push(record)
        writePlaysToFile(plays)
      },
      async getTotalPlays() {
        return readPlaysFromFile().length
      },
    }
  }

  const pool = new Pool({ connectionString })
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS plays (
        id SERIAL PRIMARY KEY,
        age_group TEXT,
        gender TEXT,
        location TEXT,
        selected_card_ids JSONB NOT NULL,
        category_scores JSONB NOT NULL,
        result TEXT NOT NULL,
        balance INTEGER NOT NULL DEFAULT 0,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
    console.log('[storage] PostgreSQL connected.')
    return {
      mode: 'db',
      async getPlays() {
        const { rows } = await pool.query('SELECT selected_card_ids, category_scores FROM plays')
        return rows.map(normalizePlayRow)
      },
      async savePlay(record) {
        await pool.query(
          `INSERT INTO plays (age_group, gender, location, selected_card_ids, category_scores, result, balance, submitted_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            record.ageGroup ?? null,
            record.gender ?? null,
            record.location ?? null,
            JSON.stringify(record.selectedCardIds),
            JSON.stringify(record.categoryScores),
            record.result,
            typeof record.balance === 'number' ? record.balance : 0,
            record.submittedAt || new Date().toISOString(),
          ]
        )
      },
      async getTotalPlays() {
        const { rows } = await pool.query('SELECT COUNT(*) AS count FROM plays')
        return Number(rows[0]?.count ?? 0)
      },
    }
  } catch (error) {
    console.error('[storage] PostgreSQL unavailable. Falling back to JSON file storage.', error)
    await pool.end().catch(() => {})
    return {
      mode: 'file',
      async getPlays() {
        return readPlaysFromFile()
      },
      async savePlay(record) {
        const plays = readPlaysFromFile()
        plays.push(record)
        writePlaysToFile(plays)
      },
      async getTotalPlays() {
        return readPlaysFromFile().length
      },
    }
  }
}

const app = express()
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true)
      return callback(null, false)
    },
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

async function startServer() {
  const storage = await createStorage()
  console.log(`[storage] mode=${storage.mode}`)

  app.get('/api/stats', async (_req, res) => {
    try {
      const totalPlays = await storage.getTotalPlays()
      res.json({ totalPlays })
    } catch (err) {
      console.error(err)
      res.status(500).json({ ok: false, message: 'Storage error' })
    }
  })

  app.post('/api/play', async (req, res) => {
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

    try {
      await storage.savePlay(record)
      return res.status(201).json({ ok: true, message: 'saved' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ ok: false, message: 'Storage error' })
    }
  })

  app.get('/api/analytics', async (_req, res) => {
    try {
      const plays = await storage.getPlays()
      const cardTitles = readCardsMaster()

      const categoryTotal = {}
      let totalPicks = 0

      for (const play of plays) {
        const scores = play.categoryScores || {}
        for (const [rawCat, count] of Object.entries(scores)) {
          const n = Number(count) || 0
          if (!n) continue
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

      return res.json({
        categoryRates,
        communityPickRate,
        popularCards: sorted,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ ok: false, message: 'Storage error' })
    }
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
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
