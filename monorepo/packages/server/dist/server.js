"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const env_1 = require("./config/env");
// Creation instance app express
const app = (0, express_1.default)();
const { PORT, FRONTEND_URL } = env_1.env;
app.use((0, cookie_parser_1.default)());
// Configuration CORS pour permettre les requetes de toutes les origines
app.use((0, cors_1.default)({
    origin: FRONTEND_URL, // Autoriser uniquement cette adresse à requeter sur le serveur
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Methodes HTTP autorisées
    credentials: true // Autoriser l'envoi de cookie (JWT par exemple)
}));
// Utilisation du middleware express.json() pour analyser les requêtes JSON
app.use(express_1.default.json()); // le payload (le body) de la req sera accessible dans toutes mes routes depuis req.body
app.use(express_1.default.urlencoded({ extended: true })); // lire le body lorsque le payload sera de type form-data-urlencoded (formulaire)
// J'utilise le router défini dans routes/index.routes.ts pour gérer les routes de mon application de façon globale
app.use(index_routes_1.default);
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
