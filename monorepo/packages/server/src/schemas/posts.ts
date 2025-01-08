import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

// id sequentielle ( 1, 2, 3, ... ... )
// uuid UNIVERSALLY UNIQUE IDENTIFIER

export const posts = pgTable("posts", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    author: uuid('author').references(() => users.id, { onDelete: "cascade" }).notNull(), // la colonne author est une relation avec la table users, on chaine avec la methode references avec le schéma users: notre FK (foreign key) est donc author qui fait référence à l'id de la table users
    created_at: timestamp('date').defaultNow() // la colonne date est une timestamp qui a une valeur par défaut de la date actuelle
});