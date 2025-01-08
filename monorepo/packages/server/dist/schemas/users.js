"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// ici users est un schéma de la table users qui a 3 colonnes: id username password
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(), // id sera un uuid avec une valeur aléatoire par défaut qui sera la clé primaire
    username: (0, pg_core_1.varchar)('username', { length: 255 }).notNull(), // username sera un varchar (length max 255) obligatoire (not null)
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull() // password sera un varchar (length max 255) obligatoire (not null)
});
