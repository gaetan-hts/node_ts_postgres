"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
// id sequentielle ( 1, 2, 3, ... ... )
// uuid UNIVERSALLY UNIQUE IDENTIFIER
exports.posts = (0, pg_core_1.pgTable)("posts", {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    author: (0, pg_core_1.uuid)('author').references(() => users_1.users.id, { onDelete: "cascade" }).notNull(), // la colonne author est une relation avec la table users, on chaine avec la methode references avec le schéma users: notre FK (foreign key) est donc author qui fait référence à l'id de la table users
    created_at: (0, pg_core_1.timestamp)('date').defaultNow() // la colonne date est une timestamp qui a une valeur par défaut de la date actuelle
});
