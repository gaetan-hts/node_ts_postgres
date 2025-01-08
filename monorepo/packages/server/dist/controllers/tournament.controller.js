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
exports.deleteTournamentByIdController = exports.updateTournamentStatusController = exports.getTournamentByIdController = exports.getAllTournamentsController = exports.createTournamentController = void 0;
const utils_1 = require("../utils");
const tournament_models_1 = require("../models/tournament.models");
// Create a new tournament
const createTournamentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validating the incoming data before creating the tournament
        const newTournament = yield (0, tournament_models_1.createTournament)(req.body);
        return (0, utils_1.APIResponse)(res, newTournament, "Tournament created successfully", 201);
    }
    catch (error) {
        return (0, utils_1.APIResponse)(res, null, error.message, 500);
    }
});
exports.createTournamentController = createTournamentController;
// Get all tournaments
const getAllTournamentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentsList = yield (0, tournament_models_1.getAllTournaments)();
        return (0, utils_1.APIResponse)(res, tournamentsList, "Tournaments fetched successfully", 200);
    }
    catch (error) {
        return (0, utils_1.APIResponse)(res, null, error.message, 500);
    }
});
exports.getAllTournamentsController = getAllTournamentsController;
// Get a tournament by ID
const getTournamentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tournament = yield (0, tournament_models_1.getTournamentById)(id);
        if (!tournament) {
            return (0, utils_1.APIResponse)(res, null, "Tournament not found", 404);
        }
        return (0, utils_1.APIResponse)(res, tournament, "Tournament fetched successfully", 200);
    }
    catch (error) {
        return (0, utils_1.APIResponse)(res, null, error.message, 500);
    }
});
exports.getTournamentByIdController = getTournamentByIdController;
// Update tournament status
const updateTournamentStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTournament = yield (0, tournament_models_1.updateTournamentStatus)(id, status);
        return (0, utils_1.APIResponse)(res, updatedTournament, "Tournament status updated successfully", 200);
    }
    catch (error) {
        return (0, utils_1.APIResponse)(res, null, error.message, 500);
    }
});
exports.updateTournamentStatusController = updateTournamentStatusController;
// Delete a tournament by ID
const deleteTournamentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, tournament_models_1.deleteTournamentById)(id);
        return (0, utils_1.APIResponse)(res, null, "Tournament deleted successfully", 200);
    }
    catch (error) {
        return (0, utils_1.APIResponse)(res, null, error.message, 500);
    }
});
exports.deleteTournamentByIdController = deleteTournamentByIdController;