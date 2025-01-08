// On importe notre config de l'environnement; le package dotenv/config nous permettra de lire ces variables d'environnement
import 'dotenv/config'

// Le type config du package drizzle-kit definit la structure de notre configuration Drizzle
import { defineConfig } from "drizzle-kit";

import { env } from './env';
const { DATABASE_URL } = env;

export default defineConfig({
    // schema indique à drizzle où se trouve le fichier où sont exportés tout nos schémas de tables
    schema: 'src/schemas/index.ts',
    // out indique où Drizzle va générer les fichiers de migration, le journal et les métadonnées
    out: 'src/migrations',
    // On indique à Drizzle quel driver utiliser pour se connecter à la DB
    dialect: "postgresql",
    dbCredentials: {
        url: DATABASE_URL
    },
    // verbose nous permettra d'avoir + de logs/infos dans la console (idéal pour le debug)
    verbose: true,
    strict: true
});