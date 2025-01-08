"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// On importe notre config de l'environnement; le package dotenv/config nous permettra de lire ces variables d'environnement
require("dotenv/config");
// Le type config du package drizzle-kit definit la structure de notre configuration Drizzle
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./env");
const { DATABASE_URL } = env_1.env;
exports.default = (0, drizzle_kit_1.defineConfig)({
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
