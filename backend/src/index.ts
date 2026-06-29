/**
 * Main application entry point for Hyperspace MVP Backend.
 * Initializes the Hono application, configures middleware, and mounts routers.
 */
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import type { AppEnv } from './types'

// Import Routers
import authRouter from './routes/auth'
import entriesRouter from './routes/entries'
import publicRouter from './routes/public'

const app = new Hono<AppEnv>()

// Global Middleware
app.use('*', logger())
app.use('*', cors())

/**
 * @route GET /
 * @description Root health check endpoint
 */
app.get('/', (c) => c.text('Hyperspace API is running and ready!'))

/**
 * @route GET /health
 * @description Deep health check ensuring database connectivity
 */
app.get('/health', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT 1 as is_alive').all()
    return c.json({ status: 'ok', db: 'connected', results })
  } catch (error: any) {
    return c.json({ status: 'error', message: error.message }, 500)
  }
})

// Mount API Routes
app.route('/api/auth', authRouter)
app.route('/api/entries', entriesRouter)
app.route('/api/public', publicRouter)

// 404 Handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404)
})

// Global Error Handler
app.onError((err, c) => {
  console.error(`[Error] ${err.message}`)
  return c.json({ error: 'Internal server error' }, 500)
})

export default app
