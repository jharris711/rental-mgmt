import { Context, t } from 'elysia'
import { db as dbClient } from '../../db'
import { user } from '../../db/schema'
import { verifyPassword } from '../../db/auth'
import { eq } from 'drizzle-orm'


const User = t.Object({
    username: t.String({ minLength: 3 }),
    email:    t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
})

export const loginUser = async ({ body, set }: Context) => {
    const { username, password } = body as typeof User;

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
}
