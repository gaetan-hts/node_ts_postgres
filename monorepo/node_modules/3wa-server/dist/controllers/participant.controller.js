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
exports.getTournamentParticipants = exports.deleteParticipant = exports.addNewParticipant = void 0;
const participant_model_1 = require("../models/participant.model");
const utils_1 = require("../utils");
// Create new participant
const addNewParticipant = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournamentId, userId } = request.body;
    try {
        const participant = yield (0, participant_model_1.addParticipant)({ tournamentId, userId });
        (0, utils_1.APIResponse)(response, participant, "Participant ajouté avec succès", 201);
    }
    catch (error) {
        utils_1.logger.error(`Error adding participant: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur lors de l'ajout du participant", 500);
    }
});
exports.addNewParticipant = addNewParticipant;
// Delete participant by ID
const deleteParticipant = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const removedParticipant = yield (0, participant_model_1.removeParticipant)(id);
        if (removedParticipant) {
            (0, utils_1.APIResponse)(response, removedParticipant, "Participant supprimé avec succès");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "Participant introuvable", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Error removing participant: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur lors de la suppression du participant", 500);
    }
});
exports.deleteParticipant = deleteParticipant;
// Fetch all participants by tournament ID
const getTournamentParticipants = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournamentId } = request.params;
    try {
        const participants = yield (0, participant_model_1.getParticipantsByTournament)(tournamentId);
        (0, utils_1.APIResponse)(response, participants, "Participants récupérés avec succès");
    }
    catch (error) {
        utils_1.logger.error(`Error fetching participants: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Erreur lors de la récupération des participants", 500);
    }
});
exports.getTournamentParticipants = getTournamentParticipants;
