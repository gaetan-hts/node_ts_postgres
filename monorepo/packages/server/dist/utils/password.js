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
const argon2_1 = __importDefault(require("argon2"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password || password.length < 6) { // Vérification manuelle
            console.error('Mot de passe invalide: trop court ou vide');
            return;
        }
        // On va hash un mot de passe
        try {
            const hash = yield argon2_1.default.hash(password, {
                type: argon2_1.default.argon2id, // utilisation de l'algo argon2id pour le hashage -> le + recommandé
                // v options hardware en dessous
                memoryCost: 2 ** 16, // 2^16=65536=64MB
                timeCost: 3, // 3 passes -> cad 3 itérations pour le hashage
                parallelism: 1, // 1 thread (coeur CPU) utilisé pour le hashage 
                salt: Buffer.from("SuperSaltGentil") // "clé" ou salt de hashage pour rendre le hashage unique
            });
            console.log('Mot de passe hashé: ', hash);
            return hash;
        }
        catch (err) {
            console.error('Erreur de hashage: ', err);
        }
    });
}
// On vérifie que le mot de passe hashé et en clair matches bien
function verifyPassword(hashedPassword, inputPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(hashedPassword);
            console.log(inputPassword);
            const result = yield argon2_1.default.verify(hashedPassword, inputPassword);
            console.log(result);
            return result;
        }
        catch (err) {
            console.error('Erreur lors de la vérification: ', err);
            return false;
        }
    });
}
