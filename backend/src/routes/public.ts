/**
 * Public routes for the future Hyperspace Website.
 * Exposes only journal entries marked as public. No authentication required.
 */
import { Hono } from 'hono'
import { Redis } from '@upstash/redis/cloudflare'
import { hashApiKey } from '../utils/crypto'
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

/**
 * @route GET /api/public/sdk/entries
 * @description Fetches all public journal entries for a specific developer using their Server-Side API Key.
 * @returns { entries[] } array of public journal entries
 */
publicRouter.get('/sdk/entries', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid Authorization header' }, 401)
  }

  const rawKey = authHeader.split(' ')[1]
  
  try {
    const keyHash = await hashApiKey(rawKey)

    // Lookup user by key_hash
    const apiKeyRecord: any = await c.env.DB.prepare(
      'SELECT user_id FROM api_keys WHERE key_hash = ?'
    ).bind(keyHash).first()

    if (!apiKeyRecord) {
      return c.json({ error: 'Invalid API Key' }, 401)
    }

    const userId = apiKeyRecord.user_id
    const cacheKey = `sdk_entries_${userId}`

    // 1. Try to read from Redis Cache
    try {
      const redis = new Redis({
        url: c.env.UPSTASH_REDIS_REST_URL,
        token: c.env.UPSTASH_REDIS_REST_TOKEN,
      })
      const cachedEntries = await redis.get(cacheKey)
      
      if (cachedEntries) {
        // Cache Hit!
        return c.json({ entries: cachedEntries, cached: true })
      }
    } catch (e) {
      console.warn('Redis Cache Read Failed:', e)
      // Continue to DB if Redis fails
    }

    // 2. Cache Miss: Fetch from DB
    const { results } = await c.env.DB.prepare(
      'SELECT id, content, mood, location, created_at FROM entries WHERE user_id = ? AND is_public = 1 ORDER BY created_at DESC'
    ).bind(userId).all()

    // 3. Save to Redis Cache (Fire and forget, don't wait/block the response)
    try {
      const redis = new Redis({
        url: c.env.UPSTASH_REDIS_REST_URL,
        token: c.env.UPSTASH_REDIS_REST_TOKEN,
      })
      // Cache indefinitely (or you can add { ex: 3600 } for 1hr expiration)
      await redis.set(cacheKey, results)
    } catch (e) {
      console.warn('Redis Cache Write Failed:', e)
    }

    return c.json({ entries: results, cached: false })
  } catch (error) {
    return c.json({ error: 'Failed to fetch SDK entries' }, 500)
  }
})

export default publicRouter
