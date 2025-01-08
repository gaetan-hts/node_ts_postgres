"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournaments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tournaments = (0, pg_core_1.pgTable)('tournaments', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(), // Example: 'bullet', 'blitz', 'rapid'
    startDate: (0, pg_core_1.date)('start_date').notNull(),
    endDate: (0, pg_core_1.date)('end_date'),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull().default('scheduled'), // Example: 'scheduled', 'in progress', 'completed'
    ranking: (0, pg_core_1.json)('ranking'), // Stores a JSON array of rankings
});
