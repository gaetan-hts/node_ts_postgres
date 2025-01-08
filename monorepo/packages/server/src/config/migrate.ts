import { Pool } from "pg"; // Pool nous permet de créer un pool
// migrate est une fonction de Drizzle qui permet de migrer la DB
import { migrate } from "drizzle-orm/node-postgres/migrator";

// NodePgDatabase est une interface (TS) qui définit les méthodes pour interagir avec la db
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import { env } from "./env";
const { DATABASE_URL } = env;

async function main() {
    // Nous créons un pool de connexion à la DB avec notre URL de connexion
    const pool = new Pool({ connectionString: DATABASE_URL });

    // On initialise la co à la DB pour avoir une instance de NodePgDatabse
    const db: NodePgDatabase = drizzle(pool);

    console.info('Migrating Database ...');

    // On appelle enfin la fonction migrate de Drizzle, qui va migrer la DB en appliquant les migrations de schémas
    // dans le dossier spécifié
    await migrate(db, { migrationsFolder: 'src/migrations' });
    console.log('Database migrated successfully');

    // On ferme la connexion à la DB
    await pool.end();
}

main()
