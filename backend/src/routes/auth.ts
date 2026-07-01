/**
 * Authentication routes for Hyperspace MVP.
 * Handles user registration and secure login via JWT.
 */
import { Hono } from 'hono'
import { sign, jwt } from 'hono/jwt'
import { hashPassword, verifyPassword, hashApiKey } from '../utils/crypto'
import type { AppEnv, JwtPayload } from '../types'

const authRouter = new Hono<AppEnv>()

/**
 * @route POST /api/auth/register
 * @description Registers a new user with an email and password. Hashes the password and returns a JWT.
 * @accepts { email, password } JSON payload
 * @returns { token, user } on success, or { error } on failure
 */
authRouter.post('/register', async (c) => {
  const { email, password } = await c.req.json()
  
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  try {
    const hashedPassword = await hashPassword(password)
    const userId = crypto.randomUUID()
    const now = new Date().toISOString()

    // Insert user into D1
    await c.env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)'
    ).bind(userId, email, hashedPassword, now).run()

    // Generate JWT
    const token = await sign({
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days expiration
    }, c.env.JWT_SECRET)

    return c.json({ 
      token, 
      user: { id: userId, email } 
    }, 201)

  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return c.json({ error: 'Email already exists' }, 409)
    }
    return c.json({ error: 'Internal server error' }, 500)
  }
})

/**
 * @route POST /api/auth/login
 * @description Authenticates a user and returns a JWT.
 * @accepts { email, password } JSON payload
 * @returns { token, user } on success, or { error } on failure
 */
authRouter.post('/login', async (c) => {
  const { email, password } = await c.req.json()

  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  try {
    // Fetch user from DB
    const user: any = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first()

    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }

    // Verify password against stored hash
    const isValid = await verifyPassword(password, user.password_hash)
    if (!isValid) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }

    // Generate JWT
    const token = await sign({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days expiration
    }, c.env.JWT_SECRET)

    return c.json({ 
      token, 
      user: { id: user.id, email: user.email } 
    })

  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500)
  }
})

/**
 * @route POST /api/auth/keys
 * @description Generates a new API Key for the authenticated user. Replaces any existing key.
 * @returns { rawKey } on success
 */
authRouter.post('/keys', async (c, next) => {
  // Apply JWT middleware dynamically for this specific route
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    alg: 'HS256'
  })
  return jwtMiddleware(c, next)
}, async (c) => {
  const payload = c.get('jwtPayload') as JwtPayload
  const userId = payload.sub

  try {
    // 1. Generate secure random key
    const rawKey = `hyp_${crypto.randomUUID().replace(/-/g, '')}${crypto.randomUUID().replace(/-/g, '')}`
    
    // 2. Hash the key for storage
    const keyHash = await hashApiKey(rawKey)
    const now = new Date().toISOString()

    // 3. Upsert the key into D1 (since user_id is UNIQUE, we use ON CONFLICT REPLACE to ensure only 1 active key)
    await c.env.DB.prepare(
      `INSERT INTO api_keys (key_hash, user_id, created_at) 
       VALUES (?, ?, ?) 
       ON CONFLICT(user_id) DO UPDATE SET key_hash = excluded.key_hash, created_at = excluded.created_at`
    ).bind(keyHash, userId, now).run()

    return c.json({ rawKey }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to generate API Key' }, 500)
  }
})

export default authRouter
