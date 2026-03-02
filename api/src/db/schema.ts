import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createId } from '@paralleldrive/cuid2'


// schema goes here

export const table = {} as const

export type Table = typeof table