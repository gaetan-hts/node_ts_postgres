import { relations } from "drizzle-orm";
import { users, tournaments, matches, participants } from "./";

// Define relationships for the `users` table
export const userRelations = relations(users, ({ many }) => ({
  matchesAsPlayer1: many(matches), // A user can be player 1 in multiple matches
  matchesAsPlayer2: many(matches), // A user can be player 2 in multiple matches
  tournamentParticipations: many(participants), // A user can participate in multiple tournaments
}));

// Define relationships for the `tournaments` table
export const tournamentRelations = relations(tournaments, ({ many }) => ({
  matches: many(matches), // A tournament can have multiple matches
  participants: many(participants), // A tournament can have multiple participants
}));

// Define relationships for the `matches` table
export const matchRelations = relations(matches, ({ one }) => ({
  tournament: one(tournaments), // Each match belongs to one tournament
  player1: one(users), // Player 1 is a single user
  player2: one(users), // Player 2 is a single user
}));

// Define relationships for the `participants` table
export const participantRelations = relations(participants, ({ one }) => ({
  user: one(users), // Each participant corresponds to one user
  tournament: one(tournaments), // Each participant corresponds to one tournament
}));
