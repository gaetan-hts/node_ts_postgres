"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    username: (0, pg_core_1.varchar)('username', { length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
    dateOfBirth: (0, pg_core_1.date)('date_of_birth').notNull(),
    isMale: (0, pg_core_1.boolean)('is_male').notNull(), // True = Male, False = Female
    eloBullet: (0, pg_core_1.integer)('elo_bullet').notNull().default(1200),
    eloBlitz: (0, pg_core_1.integer)('elo_blitz').notNull().default(1200),
    eloRapid: (0, pg_core_1.integer)('elo_rapid').notNull().default(1200),
});
