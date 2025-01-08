import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const matches = pgTable('matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  tournamentId: uuid('tournament_id').notNull(), // References a tournament
  player1Id: uuid('player1_id').notNull(), // References player 1
  player2Id: uuid('player2_id').notNull(), // References player 2
  result: varchar('result', { length: 50 }), // Example: 'draw', 'player1', 'player2'
  matchType: varchar('match_type', { length: 50 }).notNull(), // Example: 'bullet', 'blitz', 'rapid'
});
