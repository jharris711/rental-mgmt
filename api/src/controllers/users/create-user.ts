import { Context, t } from 'elysia'
import { db as dbClient } from '../../db'
import { user } from '../../db/schema'
import { hashPassword, generateSalt } from '../../db/auth'
import { eq } from 'drizzle-orm'

const User = t.Object({
    username: t.String({ minLength: 3 }),
    email:    t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
})

export const createUser = async ({ body, set }: Context) => {
    const { username, email, password } = body as typeof User;

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

        console.log(newUser)

        set.status = 201
        return newUser
    } catch (error) {
        set.status = 500
        return { error: 'Failed to create user' }
    }
};
