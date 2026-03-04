import { Elysia, t } from 'elysia'
import { db as dbClient } from '../db'
import { user } from '../db/schema'
import { hashPassword, verifyPassword, generateSalt } from '../db/auth'
import { eq } from 'drizzle-orm'

export const authController = new Elysia({ prefix: '/auth' })
    .post('/register', async ({ body, set }) => {
        const { username, email, password } = body

        try {
            // Check if user already exists
            const existingUser = await dbClient
                .select()
                .from(user)
                .where(eq(user.username, username))
                .limit(1)

            if (existingUser.length > 0) {
                set.status = 409
                return { error: 'Username already exists' }
            }

            // Hash password (includes salt internally)
            const hashedPassword = await hashPassword(password)
            
            // Generate a salt for the salt column (if you need it for other purposes)
            // Note: Bun.password.hash already salts internally, so this is optional
            const salt = generateSalt()

            // Create user
            const [newUser] = await dbClient
                .insert(user)
                .values({
                    username,
                    email,
                    password: hashedPassword,
                    salt, // You can remove this if you update your schema
                })
                .returning({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                })

            set.status = 201
            return newUser
        } catch (error) {
            set.status = 500
            return { error: 'Failed to create user' }
        }
    }, {
        body: t.Object({
            username: t.String({ minLength: 3 }),
            email: t.String({ format: 'email' }),
            password: t.String({ minLength: 8 }),
        })
    })
    .post('/login', async ({ body, set }) => {
        const { username, password } = body

        try {
            // Find user
            const [existingUser] = await dbClient
                .select()
                .from(user)
                .where(eq(user.username, username))
                .limit(1)

            if (!existingUser) {
                set.status = 401
                return { error: 'Invalid credentials' }
            }

            // Verify password
            const isValid = await verifyPassword(password, existingUser.password)

            if (!isValid) {
                set.status = 401
                return { error: 'Invalid credentials' }
            }

            // Return user data (excluding password and salt)
            return {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
            }
        } catch (error) {
            set.status = 500
            return { error: 'Login failed' }
        }
    }, {
        body: t.Object({
            username: t.String(),
            password: t.String(),
        })
    })
