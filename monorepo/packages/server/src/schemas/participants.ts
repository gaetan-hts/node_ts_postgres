import { pgTable, uuid } from "drizzle-orm/pg-core";

export const participants = pgTable('participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  tournamentId: uuid('tournament_id').notNull(), // References a tournament
  userId: uuid('user_id').notNull(), // References a user
});
