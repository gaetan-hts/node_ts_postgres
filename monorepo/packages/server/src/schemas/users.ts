import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

// ici users est un schéma de la table users qui a 3 colonnes: id username password
export const users =  pgTable('users', { // on utilise pgTable pour créer une table, premier param = nom de la table, 2eme = objet qui contient les colonnes de la table
    id : uuid('id').defaultRandom().primaryKey(), // id sera un uuid avec une valeur aléatoire par défaut qui sera la clé primaire
    email: varchar('email', { length: 255 }).notNull().unique(),
    username: varchar('username', { length: 255 }).notNull(), // username sera un varchar (length max 255) obligatoire (not null)
    password: varchar('password', { length: 255 }).notNull() // password sera un varchar (length max 255) obligatoire (not null)
});
