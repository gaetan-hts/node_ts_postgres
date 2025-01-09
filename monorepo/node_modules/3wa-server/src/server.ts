import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

import { env } from "./config/env";
import router from "./routes/index.routes";

// Creation instance app express
const app = express();
const { PORT, FRONTEND_URL } = env;


app.use(cookieParser());
// Configuration CORS pour permettre les requetes de toutes les origines
app.use(cors({
    origin: FRONTEND_URL, // Autoriser uniquement cette adresse à requeter sur le serveur
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Methodes HTTP autorisées
    credentials: true // Autoriser l'envoi de cookie (JWT par exemple)
}));

// Utilisation du middleware express.json() pour analyser les requêtes JSON
app.use(express.json()); // le payload (le body) de la req sera accessible dans toutes mes routes depuis req.body
app.use(express.urlencoded({extended: true})); // lire le body lorsque le payload sera de type form-data-urlencoded (formulaire)

// J'utilise le router défini dans routes/index.routes.ts pour gérer les routes de mon application de façon globale
app.use(router);

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
})