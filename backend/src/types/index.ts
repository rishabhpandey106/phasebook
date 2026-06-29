/**
 * Application-wide TypeScript definitions.
 * This ensures type safety across all routes and utilities.
 */

/**
 * Defines the environment bindings provided by Cloudflare Workers.
 */
export type Bindings = {
  /** The D1 SQL Database instance */
  DB: D1Database
  /** The secret key used for signing and verifying JWTs */
  JWT_SECRET: string
}

/**
 * Defines the standard Hono application environment.
 */
export type AppEnv = {
  Bindings: Bindings
  Variables: {
    /** The decoded payload from the verified JWT */
    jwtPayload: JwtPayload
  }
}

/**
 * Defines the structure of the JWT payload for an authenticated user.
 */
export type JwtPayload = {
  /** The user's unique identifier from the database */
  sub: string
  /** The time the token was issued at (Unix timestamp) */
  iat?: number
  /** The expiration time of the token (Unix timestamp) */
  exp?: number
}
