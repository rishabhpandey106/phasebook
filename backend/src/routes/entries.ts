/**
 * Private Journal Entries routes for Hyperspace MVP.
 * Handles CRUD operations for a user's personal journal.
 * All routes here are protected by JWT authentication.
 */
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import type { AppEnv, JwtPayload } from '../types'

const entriesRouter = new Hono<AppEnv>()

// Middleware: Protect all routes in this router with JWT validation
entriesRouter.use('/*', (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    alg: 'HS256'
  })
  return jwtMiddleware(c, next)
})

/**
 * @route GET /api/entries
 * @description Fetches all journal entries for the authenticated user, ordered by creation date (newest first).
 * @returns { entries[] } array of journal entries
 */
entriesRouter.get('/', async (c) => {
  const payload = c.get('jwtPayload') as JwtPayload
  const userId = payload.sub

  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM entries WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all()

    return c.json({ entries: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch entries' }, 500)
  }
})

/**
 * @route POST /api/entries
 * @description Creates a new journal entry for the authenticated user.
 * @accepts { content, is_public, mood, location } JSON payload
 * @returns { entry } the created entry object
 */
entriesRouter.post('/', async (c) => {
  const payload = c.get('jwtPayload') as JwtPayload
  const userId = payload.sub
  
  const { content, is_public = 0, mood = null, location = null } = await c.req.json()

  if (!content) {
    return c.json({ error: 'Content is required' }, 400)
  }

  try {
    // Check if an entry already exists for this user today (UTC date)
    const existingToday = await c.env.DB.prepare(
      "SELECT id FROM entries WHERE user_id = ? AND date(created_at) = date('now')"
    ).bind(userId).first()

    if (existingToday) {
      return c.json({ error: 'You have already created an entry for today. Please edit your existing entry.' }, 409)
    }

    const entryId = crypto.randomUUID()
    const now = new Date().toISOString()

    await c.env.DB.prepare(
      `INSERT INTO entries (id, user_id, content, is_public, mood, location, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(entryId, userId, content, is_public ? 1 : 0, mood, location, now).run()

    // Fetch the newly created entry to return it
    const newEntry = await c.env.DB.prepare(
      'SELECT * FROM entries WHERE id = ?'
    ).bind(entryId).first()

    return c.json({ entry: newEntry }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create entry' }, 500)
  }
})

/**
 * @route PUT /api/entries/:id
 * @description Updates an existing journal entry. User must own the entry.
 * @accepts { content, is_public, mood, location } JSON payload
 * @returns { entry } the updated entry object
 */
entriesRouter.put('/:id', async (c) => {
  const payload = c.get('jwtPayload') as JwtPayload
  const userId = payload.sub
  const entryId = c.req.param('id')
  
  const { content, is_public, mood, location } = await c.req.json()

  try {
    // First verify ownership
    const existing: any = await c.env.DB.prepare(
      'SELECT user_id FROM entries WHERE id = ?'
    ).bind(entryId).first()

    if (!existing) {
      return c.json({ error: 'Entry not found' }, 404)
    }

    if (existing.user_id !== userId) {
      return c.json({ error: 'Unauthorized to modify this entry' }, 403)
    }

    // Build update query dynamically based on provided fields
    const updates = []
    const bindings = []

    if (content !== undefined) {
      updates.push('content = ?')
      bindings.push(content)
    }
    if (is_public !== undefined) {
      updates.push('is_public = ?')
      bindings.push(is_public ? 1 : 0)
    }
    if (mood !== undefined) {
      updates.push('mood = ?')
      bindings.push(mood)
    }
    if (location !== undefined) {
      updates.push('location = ?')
      bindings.push(location)
    }

    if (updates.length === 0) {
      return c.json({ error: 'No fields provided to update' }, 400)
    }

    // Add ID to bindings for the WHERE clause
    bindings.push(entryId)

    const query = `UPDATE entries SET ${updates.join(', ')} WHERE id = ?`
    await c.env.DB.prepare(query).bind(...bindings).run()

    // Fetch updated entry
    const updatedEntry = await c.env.DB.prepare(
      'SELECT * FROM entries WHERE id = ?'
    ).bind(entryId).first()

    return c.json({ entry: updatedEntry })
  } catch (error) {
    return c.json({ error: 'Failed to update entry' }, 500)
  }
})

/**
 * @route DELETE /api/entries/:id
 * @description Deletes a journal entry. User must own the entry.
 * @returns { message } success indicator
 */
entriesRouter.delete('/:id', async (c) => {
  const payload = c.get('jwtPayload') as JwtPayload
  const userId = payload.sub
  const entryId = c.req.param('id')

  try {
    // First verify ownership
    const existing: any = await c.env.DB.prepare(
      'SELECT user_id FROM entries WHERE id = ?'
    ).bind(entryId).first()

    if (!existing) {
      return c.json({ error: 'Entry not found' }, 404)
    }

    if (existing.user_id !== userId) {
      return c.json({ error: 'Unauthorized to delete this entry' }, 403)
    }

    await c.env.DB.prepare(
      'DELETE FROM entries WHERE id = ?'
    ).bind(entryId).run()

    return c.json({ message: 'Entry deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete entry' }, 500)
  }
})

export default entriesRouter
