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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const env_1 = require("../config/env");
const utils_1 = require("../utils");
const users_validation_1 = require("../validation/users.validation");
const user_model_1 = require("../models/user.model");
const { NODE_ENV, JWT_SECRET } = env_1.env;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = users_validation_1.userValidation.parse(request.body);
        const emailAlreadyExists = yield (0, user_model_1.findByCredentials)(email);
        if (emailAlreadyExists)
            return (0, utils_1.APIResponse)(response, [], "Cet email est déjà utilisé", 400);
        const hash = yield (0, utils_1.hashPassword)(password);
        if (!hash)
            throw new Error("Erreur lors du hashage du mot de passe");
        const [newUser] = yield (0, user_model_1.addUser)({ username, email, password: hash });
        if (!newUser)
            return (0, utils_1.APIResponse)(response, [], "Erreur lors de la création de l'utilisateur", 500);
        return (0, utils_1.APIResponse)(response, newUser.id, "Vous êtes inscrit", 200);
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);
        if (err instanceof zod_1.z.ZodError) {
            // ici on retourne les erreurs de validation
            return (0, utils_1.APIResponse)(response, err.errors, "Formulaire incorrect", 400);
        }
        (0, utils_1.APIResponse)(response, null, "Erreur serveur", 500);
    }
});
exports.register = register;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield (0, user_model_1.findByCredentials)(email);
        if (!user)
            return (0, utils_1.APIResponse)(response, [], "Email ou mot de passe invalide", 400);
        // vérification du mot de passe
        if ((yield (0, utils_1.verifyPassword)(user.password, password)) === false) {
            return (0, utils_1.APIResponse)(response, [], "Email ou mot de passe invalide", 400);
        }
        // email + mdp corrects
        // Génération des tokens refresh/access (continuer à rester connecté après une longue periode d'activité)
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // On ajoute les cookies: il faut bien que ces deux tokens servent à quelque chose: on aura 2 cookies, un de la valeur de l'accesstoken et un autre du refresh token
        response.cookie('accessToken', accessToken, {
            httpOnly: true, // true empêche l'accès au cookie en javascript: accessible uniquement via communication http
            sameSite: 'strict', // protége contre les attaques CSRF
            secure: NODE_ENV === "production" // signifie que le cookie ne sera envoyé que sur du HTTPS
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
