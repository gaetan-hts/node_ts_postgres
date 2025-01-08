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
exports.deleteMatch = exports.updateMatch = exports.createNewMatch = exports.getMatch = void 0;
const match_model_1 = require("../models/match.model");
const utils_1 = require("../utils");
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
const createNewMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { tournamentId, player1Id, player2Id, result, matchType } = request.body;
    try {
        const newMatch = yield (0, match_model_1.createMatch)({ tournamentId, player1Id, player2Id, result, matchType });
        (0, utils_1.APIResponse)(response, newMatch, "Match created successfully", 201);
    }
    catch (error) {
        utils_1.logger.error(`Error creating match: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error creating match", 500);
    }
});
exports.createNewMatch = createNewMatch;
const updateMatch = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { matchId } = request.params;
    const { result } = request.body;
    try {
        const updatedMatch = yield (0, match_model_1.updateMatchResult)(matchId, result);
        if (updatedMatch) {
            (0, utils_1.APIResponse)(response, updatedMatch, "Match result updated successfully");
        }
        else {
            (0, utils_1.APIResponse)(response, null, "Match not found or result not updated", 404);
        }
    }
    catch (error) {
        utils_1.logger.error(`Error updating match result: ${error.message}`);
        (0, utils_1.APIResponse)(response, null, "Error updating match result", 500);
    }
});
exports.updateMatch = updateMatch;
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
