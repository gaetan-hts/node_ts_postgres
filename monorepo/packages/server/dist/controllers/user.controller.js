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
exports.getUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const utils_1 = require("../utils");
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_1.logger.info("[GET] /users - Récupérer tout les utilisateurs");
        const users = yield (0, user_model_1.getAllUsers)();
        (0, utils_1.APIResponse)(response, users, "List of all users", 200);
    }
    catch (error) {
        utils_1.logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, error.message, 500);
    }
});
exports.getUsers = getUsers;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const user = yield (0, user_model_1.getUserById)(id);
    if (user) {
        (0, utils_1.APIResponse)(response, user, "User found");
    }
    else {
        (0, utils_1.APIResponse)(response, null, "User not found", 404);
    }
});
exports.getUser = getUser;
