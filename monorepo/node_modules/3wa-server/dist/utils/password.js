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
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Fonction de hashage du mot de passe
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password || password.length < 6) {
            console.error('Mot de passe invalide: trop court ou vide');
            return;
        }
        try {
            // Génération du salt
            const saltRounds = 10; // Le nombre de rounds d'encryption
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            return hash;
        }
        catch (err) {
            console.error('Erreur de hashage: ', err);
        }
    });
}
// Fonction de vérification du mot de passe
function verifyPassword(hashedPassword, inputPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Vérification du mot de passe
            const result = yield bcrypt_1.default.compare(inputPassword, hashedPassword);
            return result;
        }
        catch (err) {
            console.error('Erreur lors de la vérification: ', err);
            return false;
        }
    });
}
