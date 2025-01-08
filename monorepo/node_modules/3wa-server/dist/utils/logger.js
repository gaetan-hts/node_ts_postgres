"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
// Configuration du logger
exports.logger = (0, winston_1.createLogger)({
    level: 'info', // Niveau de log minimal pour capturer (ca peut etre info - debug - warn - error - etc...)
    format: winston_1.format.combine(winston_1.format.colorize(), // Colorise le niveau de log en fonction de sa "gravité"
    winston_1.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), // Ajoute un timestamp à chaque log
    winston_1.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`; // Format personnalisé pour l'affichage du log
    })),
    transports: [
        new winston_1.transports.Console(), // Affiche les logs sur la console en couleur
        new winston_1.transports.File({ level: 'error', filename: 'logs/errors.log' }), // Fichier pour les erreurs
        new winston_1.transports.File({ filename: 'logs/combined.log' }) // Fichier pour TOUT les logs peut importe leurs level
    ]
});
