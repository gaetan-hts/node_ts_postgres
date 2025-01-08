import { pgTable, uuid, varchar, integer, date, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  isMale: boolean('is_male').notNull(), // True = Male, False = Female
  eloBullet: integer('elo_bullet').notNull().default(1200),
  eloBlitz: integer('elo_blitz').notNull().default(1200),
  eloRapid: integer('elo_rapid').notNull().default(1200),
});
