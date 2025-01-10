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
exports.deleteMatch = exports.updateMatch = exports.createNewMatch = exports.getMatchesByTournament = exports.getMatch = void 0;
const match_model_1 = require("../models/match.model");
const utils_1 = require("../utils");
const elo_1 = require("../utils/elo");
// Fetch match by ID
const getMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const match = yield (0, match_model_1.getMatchById)(id);
        if (match) {
            (0, utils_1.APIResponse)(response, match, "Match found");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "Match not found", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Error fetching match by ID: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error fetching match by ID", 500);
    }
});
exports.getMatch = getMatch;
// Fetch matches by tournament ID
const getMatchesByTournament = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournamentId } = request.params;
    try {
        const matches = yield (0, match_model_1.getMatchesByTournamentId)(tournamentId);
        if (matches.length > 0) {
            (0, utils_1.APIResponse)(response, matches, "Matches retrieved successfully");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "No matches found for this tournament", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Error fetching matches by tournament ID: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error fetching matches by tournament ID", 500);
    }
});
exports.getMatchesByTournament = getMatchesByTournament;
const createNewMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournamentId, player1Id, player2Id, result, matchType } = request.body;
    console.log(tournamentId, player1Id, player2Id, result, matchType);
    try {
        const newMatch = yield (0, match_model_1.createMatch)({ tournamentId, player1Id, player2Id, result, matchType });
        // Logique de mise à jour de l'ELO
        if (result === "player1" || result === "player2" || result === "draw") {
            yield handleEloUpdate(player1Id, player2Id, result, matchType);
        }
        (0, utils_1.APIResponse)(response, newMatch, "Match created successfully", 201);
    }
    catch (error) {
        utils_1.logger.error(`Error creating match: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error creating match", 500);
    }
});
exports.createNewMatch = createNewMatch;
const updateMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { result } = request.body;
    // Validate input
    if (!["player1", "player2", "draw"].includes(result)) {
        (0, utils_1.APIResponse)(response, null, "Invalid result value", 400);
        return;
    }
    try {
        // Fetch the match by ID
        const match = yield (0, match_model_1.getMatchById)(id);
        if (!match) {
            (0, utils_1.APIResponse)(response, null, "Match not found", 404);
            return;
        }
        // Update the match result
        const updatedMatch = yield (0, match_model_1.updateMatchResult)(id, result);
        // Update ELO ratings if result is valid
        if (result === "player1" || result === "player2" || result === "draw") {
            yield handleEloUpdate(match.player1Id, match.player2Id, result, match.matchType);
        }
        (0, utils_1.APIResponse)(response, updatedMatch, "Match result updated successfully");
    }
    catch (error) {
        utils_1.logger.error(`Error updating match result: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error updating match result", 500);
    }
});
exports.updateMatch = updateMatch;
// Fonction pour gérer la mise à jour de l'ELO
const handleEloUpdate = (player1Id, player2Id, result, matchType) => __awaiter(void 0, void 0, void 0, function* () {
    const player1 = yield (0, match_model_1.getUserById)(player1Id);
    const player2 = yield (0, match_model_1.getUserById)(player2Id);
    if (!player1 || !player2) {
        throw new Error("One or both players not found");
    }
    // Convertir le type de match en clé ELO
    const eloField = `elo${capitalize(matchType)}`;
    if (!(eloField in player1)) {
        throw new Error(`ELO field ${eloField} not found in player1`);
    }
    if (!(eloField in player2)) {
        throw new Error(`ELO field ${eloField} not found in player2`);
    }
    console.log("Match type:", matchType);
    console.log("ELO Field:", eloField);
    console.log("Player 1:", player1);
    console.log("Player 2:", player2);
    // Récupérer les ELO des deux joueurs
    const player1Elo = player1[eloField];
    const player2Elo = player2[eloField];
    // Calculer les nouveaux ELO
    const { newElo1, newElo2 } = (0, elo_1.updateElo)(player1Elo, player2Elo, result);
    // Mettre à jour les ELO dans la base de données
    yield (0, match_model_1.updateUserElo)(player1Id, eloField, newElo1);
    yield (0, match_model_1.updateUserElo)(player2Id, eloField, newElo2);
});
// Fonction utilitaire pour capitaliser un mot
function capitalize(matchType) {
    const map = {
        bullet: "Bullet",
        blitz: "Blitz",
        rapide: "Rapid",
    };
    return map[matchType] || matchType.charAt(0).toUpperCase() + matchType.slice(1).toLowerCase();
}
// Delete match by ID
const deleteMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { matchId } = request.params;
    const { userId } = request.body;
    try {
        const deletedMatch = yield (0, match_model_1.deleteMatchById)(matchId, userId);
        if (deletedMatch) {
            (0, utils_1.APIResponse)(response, deletedMatch, "Match deleted successfully");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "Match not found or cannot be deleted", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Error deleting match: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error deleting match", 500);
    }
});
exports.deleteMatch = deleteMatch;
