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
exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const utils_1 = require("../utils");
// Fetch all users
const getAllUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_model_1.getUsers)();
        (0, utils_1.APIResponse)(response, users, "Utilisateurs récupérés avec succès");
    }
    catch (error) {
        utils_1.logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur lors de la récupération des utilisateurs", 500);
    }
});
exports.getAllUsers = getAllUsers;
// Fetch user by his ID
const getUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const user = yield (0, user_model_1.getUser)(id);
        if (user) {
            (0, utils_1.APIResponse)(response, user, "Utilisateur récupéré avec succès");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "Utilisateur introuvable", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur lors de la récupération de l'utilisateur", 500);
    }
});
exports.getUserById = getUserById;
