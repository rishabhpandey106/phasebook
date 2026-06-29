/**
 * Authentication routes for Hyperspace MVP.
 * Handles user registration and secure login via JWT.
 */
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { hashPassword, verifyPassword } from '../utils/crypto'
import type { AppEnv } from '../types'

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

export default authRouter
