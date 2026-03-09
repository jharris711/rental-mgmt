import { Elysia, t } from 'elysia'

import {
    createUserController,
    loginUserController
} from '../controllers/users'


const CREATE_USER_ENDPOINT = '/register'
const LOGIN_USER_ENDPOINT  = '/login'

const createUserValidation = t.Object({
    username: t.String({ minLength: 3 }),
    email:    t.String({ format: 'email' }),
    password: t.String({ minLength: 8 }),
})

const loginUserValidation = t.Object({
    email: t.String(),
    password: t.String(),
})

export const userRouter = new Elysia()
    .post(CREATE_USER_ENDPOINT, createUserController, {
        body: createUserValidation
    })
    .post(LOGIN_USER_ENDPOINT, loginUserController, {
        body: loginUserValidation
    })
