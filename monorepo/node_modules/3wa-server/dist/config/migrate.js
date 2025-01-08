"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg"); // Pool nous permet de créer un pool
// migrate est une fonction de Drizzle qui permet de migrer la DB
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
// NodePgDatabase est une interface (TS) qui définit les méthodes pour interagir avec la db
const node_postgres_1 = require("drizzle-orm/node-postgres");
const env_1 = require("./env");
const { DATABASE_URL } = env_1.env;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Nous créons un pool de connexion à la DB avec notre URL de connexion
        const pool = new pg_1.Pool({ connectionString: DATABASE_URL });
        // On initialise la co à la DB pour avoir une instance de NodePgDatabse
        const db = (0, node_postgres_1.drizzle)(pool);
        console.info('Migrating Database ...');
        // On appelle enfin la fonction migrate de Drizzle, qui va migrer la DB en appliquant les migrations de schémas
        // dans le dossier spécifié
        yield (0, migrator_1.migrate)(db, { migrationsFolder: 'src/migrations' });
        console.log('Database migrated successfully');
        // On ferme la connexion à la DB
        yield pool.end();
    });
}
main();
