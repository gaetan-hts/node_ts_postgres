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
const auth_models_1 = require("../models/auth.models");
const { NODE_ENV, JWT_SECRET } = env_1.env;
// Register
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, dateOfBirth, isMale, eloBullet, eloBlitz, eloRapid, } = users_validation_1.userValidation.parse(request.body);
        // Check if the email is already in use
        const emailAlreadyExists = yield (0, auth_models_1.findByCredentials)(email);
        if (emailAlreadyExists)
            return (0, utils_1.APIResponse)(response, [], "This email is already in use", 400);
        // Hash the password
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        if (!hashedPassword)
            throw new Error("Error hashing the password");
        // Add the user to the database
        const newUser = yield (0, auth_models_1.addUser)({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            isMale,
            eloBullet,
            eloBlitz,
            eloRapid,
        });
        if (!newUser) {
            return (0, utils_1.APIResponse)(response, [], "Error creating the user", 500);
        }
        // Respond with the new user's ID
        return (0, utils_1.APIResponse)(response, newUser.id, "You are registered", 200);
    }
    catch (err) {
        utils_1.logger.error(`Error during user registration: ${err.message}`);
        // Return validation errors if present
        if (err instanceof zod_1.z.ZodError) {
            return (0, utils_1.APIResponse)(response, err.errors, "Invalid form", 400);
        }
        // Respond with a server error
        (0, utils_1.APIResponse)(response, null, "Server error", 500);
    }
});
exports.register = register;
//Login
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield (0, auth_models_1.findByCredentials)(email);
        if (!user)
            return (0, utils_1.APIResponse)(response, [], "Invalid email or password", 400);
        // Vérifier le mot de passe
        if ((yield (0, utils_1.verifyPassword)(user.password, password)) === false) {
            return (0, utils_1.APIResponse)(response, [], "Invalid email or password", 400);
        }
        // Générer un accessToken avec JWT
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // Ajouter le cookie avec l'accessToken
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production", // Assurez-vous que ce soit true en production
        });
        // Réponse avec les informations de connexion
        return (0, utils_1.APIResponse)(response, { accessToken, userId: user.id }, "You are logged in", 200);
    }
    catch (err) {
        utils_1.logger.error(`Error during user login: ${err.message}`);
        (0, utils_1.APIResponse)(response, null, "Server error", 500);
    }
});
exports.login = login;
//Logout
const logout = (request, response) => {
    // Clear the accessToken cookie
    response.clearCookie('accessToken');
    (0, utils_1.APIResponse)(response, null, "You are logged out", 200);
};
exports.logout = logout;
