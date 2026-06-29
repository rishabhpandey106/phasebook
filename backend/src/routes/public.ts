/**
 * Public routes for the future Hyperspace Website.
 * Exposes only journal entries marked as public. No authentication required.
 */
import { Hono } from 'hono'
import type { AppEnv } from '../types'

const publicRouter = new Hono<AppEnv>()

/**
 * @route GET /api/public/entries
 * @description Fetches all public journal entries across all users, for the website display.
 * @returns { entries[] } array of public journal entries
 */
publicRouter.get('/entries', async (c) => {
  try {
    // Fetch only entries where is_public is 1
    const { results } = await c.env.DB.prepare(
      'SELECT id, content, mood, location, created_at FROM entries WHERE is_public = 1 ORDER BY created_at DESC'
    ).all()

    return c.json({ entries: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch public entries' }, 500)
  }
})

export default publicRouter
