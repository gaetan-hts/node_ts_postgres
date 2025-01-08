import { createLogger, format, transports } from "winston"

// Configuration du logger
export const logger = createLogger({
    level: 'info', // Niveau de log minimal pour capturer (ca peut etre info - debug - warn - error - etc...)
    format: format.combine(
        format.colorize(), // Colorise le niveau de log en fonction de sa "gravité"
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), // Ajoute un timestamp à chaque log
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; // Format personnalisé pour l'affichage du log
        })
    ),
    transports: [
        new transports.Console(), // Affiche les logs sur la console en couleur
        new transports.File({ level: 'error', filename: 'logs/errors.log' }), // Fichier pour les erreurs
        new transports.File({ filename: 'logs/combined.log' }) // Fichier pour TOUT les logs peut importe leurs level
    ]
});