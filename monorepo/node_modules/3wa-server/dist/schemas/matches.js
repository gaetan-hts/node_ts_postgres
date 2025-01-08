"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.matches = (0, pg_core_1.pgTable)('matches', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tournamentId: (0, pg_core_1.uuid)('tournament_id').notNull(), // References a tournament
    player1Id: (0, pg_core_1.uuid)('player1_id').notNull(), // References player 1
    player2Id: (0, pg_core_1.uuid)('player2_id').notNull(), // References player 2
    result: (0, pg_core_1.varchar)('result', { length: 50 }), // Example: 'draw', 'player1', 'player2'
    matchType: (0, pg_core_1.varchar)('match_type', { length: 50 }).notNull(), // Example: 'bullet', 'blitz', 'rapid'
});
