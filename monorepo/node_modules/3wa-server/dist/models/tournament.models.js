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
exports.deleteTournamentById = exports.updateTournamentStatus = exports.getTournamentById = exports.getAllTournaments = exports.createTournament = void 0;
// models/tournament.ts
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const tournaments_1 = require("../schemas/tournaments"); // Your schema for tournaments
const utils_1 = require("../utils");
// Create a new tournament
const createTournament = (tournamentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, startDate, endDate, status = "scheduled", ranking } = tournamentData;
        const newTournament = yield pool_1.db
            .insert(tournaments_1.tournaments)
            .values({
            name,
            type,
            startDate,
            endDate,
            status,
            ranking,
        })
            .returning();
        return newTournament[0]; // Returning the inserted tournament object
    }
    catch (error) {
        utils_1.logger.error(`Error creating tournament: ${error.message}`);
        throw new Error("Error creating tournament");
    }
});
exports.createTournament = createTournament;
// Get all tournaments
const getAllTournaments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentsList = yield pool_1.db.select().from(tournaments_1.tournaments);
        return tournamentsList;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching tournaments: ${error.message}`);
        throw new Error("Error fetching tournaments");
    }
});
exports.getAllTournaments = getAllTournaments;
// Get a tournament by ID
const getTournamentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournament = yield pool_1.db
            .select()
            .from(tournaments_1.tournaments)
            .where((0, drizzle_orm_1.eq)(tournaments_1.tournaments.id, id))
            .limit(1)
            .then(results => results[0]);
        return tournament;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching tournament by ID: ${error.message}`);
        throw new Error(`Error fetching tournament by ID: ${error.message}`);
    }
});
exports.getTournamentById = getTournamentById;
// Update tournament status
const updateTournamentStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTournament = yield pool_1.db
            .update(tournaments_1.tournaments)
            .set({ status })
            .where((0, drizzle_orm_1.eq)(tournaments_1.tournaments.id, id))
            .returning();
        return updatedTournament[0]; // Returning the updated tournament object
    }
    catch (error) {
        utils_1.logger.error(`Error updating tournament status: ${error.message}`);
        throw new Error("Error updating tournament status");
    }
});
exports.updateTournamentStatus = updateTournamentStatus;
// Delete a tournament by ID
const deleteTournamentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTournament = yield pool_1.db
            .delete(tournaments_1.tournaments)
            .where((0, drizzle_orm_1.eq)(tournaments_1.tournaments.id, id));
        return deletedTournament; // Returning deleted tournament result
    }
    catch (error) {
        utils_1.logger.error(`Error deleting tournament: ${error.message}`);
        throw new Error("Tournament could not be deleted");
    }
});
exports.deleteTournamentById = deleteTournamentById;
