"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantRelations = exports.matchRelations = exports.tournamentRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require("./");
// Define relationships for the `users` table
exports.userRelations = (0, drizzle_orm_1.relations)(_1.users, ({ many }) => ({
    matchesAsPlayer1: many(_1.matches), // A user can be player 1 in multiple matches
    matchesAsPlayer2: many(_1.matches), // A user can be player 2 in multiple matches
    tournamentParticipations: many(_1.participants), // A user can participate in multiple tournaments
}));
// Define relationships for the `tournaments` table
exports.tournamentRelations = (0, drizzle_orm_1.relations)(_1.tournaments, ({ many }) => ({
    matches: many(_1.matches), // A tournament can have multiple matches
    participants: many(_1.participants), // A tournament can have multiple participants
}));
// Define relationships for the `matches` table
exports.matchRelations = (0, drizzle_orm_1.relations)(_1.matches, ({ one }) => ({
    tournament: one(_1.tournaments), // Each match belongs to one tournament
    player1: one(_1.users), // Player 1 is a single user
    player2: one(_1.users), // Player 2 is a single user
}));
// Define relationships for the `participants` table
exports.participantRelations = (0, drizzle_orm_1.relations)(_1.participants, ({ one }) => ({
    user: one(_1.users), // Each participant corresponds to one user
    tournament: one(_1.tournaments), // Each participant corresponds to one tournament
}));
