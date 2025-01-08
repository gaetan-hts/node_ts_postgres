"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participants = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.participants = (0, pg_core_1.pgTable)('participants', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tournamentId: (0, pg_core_1.uuid)('tournament_id').notNull(), // References a tournament
    userId: (0, pg_core_1.uuid)('user_id').notNull(), // References a user
});
