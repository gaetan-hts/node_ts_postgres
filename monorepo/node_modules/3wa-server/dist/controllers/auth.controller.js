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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const utils_1 = require("../utils");
const users_validation_1 = require("../validation/users.validation");
const { NODE_ENV, JWT_SECRET } = env_1.env;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation des données entrantes avec Zod
        const { email, password, username } = users_validation_1.userValidation.parse(request.body);
        return (0, utils_1.APIResponse)(response, null, "Vous êtes inscrit", 200);
    }
    catch (err) {
        // Si l'erreur est lancée par Zod, on informe le client des champs invalides
        if (err instanceof zod_1.z.ZodError) {
            return (0, utils_1.APIResponse)(response, err.errors, "Le formulaire est invalide", 400);
        }
        utils_1.logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
    }
});
exports.register = register;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // ... on insérera ici la logique d'authentification pour vérifier les informations de l'utilisateur
        // ce qui est en dessous: on considére que l'authentification est successful
        const accessToken = jsonwebtoken_1.default.sign({ id: 12 }, JWT_SECRET, { expiresIn: '1h' });
        response.cookie('accessToken', accessToken, {
            httpOnly: true, // Empeche l'accès au cookie via JS
            sameSite: 'strict', // Protection contre les attaques CSRF
            secure: NODE_ENV === "production" // On envoit le cookie uniquement via HTTPS
        });
        (0, utils_1.APIResponse)(response, null, "Vous êtes connecté", 200);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
    }
});
exports.login = login;
const logout = (request, response) => {
    response.clearCookie('accessToken');
    (0, utils_1.APIResponse)(response, null, "Vous êtes déconnecté", 200);
};
exports.logout = logout;
