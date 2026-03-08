import { Elysia, t } from 'elysia'

import { createUser, loginUser } from '../controllers/users'


export const userRouter = new Elysia()
    .post('/register', createUser, {
        body: t.Object({
            username: t.String({ minLength: 3 }),
            email: t.String({ format: 'email' }),
            password: t.String({ minLength: 8 }),
        })
    })
    .post('/login', loginUser, {
        body: t.Object({
            username: t.String(),
            password: t.String(),
        })
    })
