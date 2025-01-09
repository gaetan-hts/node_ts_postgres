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
exports.deleteMatchById = exports.updateMatchResult = exports.createMatch = exports.getMatchesByTournamentId = exports.getMatchById = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const matches_1 = require("../schemas/matches");
const utils_1 = require("../utils");
// Fetch match by ID
const getMatchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield pool_1.db
            .select()
            .from(matches_1.matches)
            .where((0, drizzle_orm_1.eq)(matches_1.matches.id, id))
            .limit(1)
            .then(results => results[0]);
        return match;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching match by ID: ${error.message}`);
        throw new Error(`Error fetching match by ID: ${error.message}`);
    }
});
exports.getMatchById = getMatchById;
// Fetch matches by tournament ID
const getMatchesByTournamentId = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentMatches = yield pool_1.db
            .select()
            .from(matches_1.matches)
            .where((0, drizzle_orm_1.eq)(matches_1.matches.tournamentId, tournamentId));
        return tournamentMatches;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching matches by tournament ID: ${error.message}`);
        throw new Error(`Error fetching matches by tournament ID: ${error.message}`);
    }
});
exports.getMatchesByTournamentId = getMatchesByTournamentId;
// Create new Match
const createMatch = (matchData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId, player1Id, player2Id, result, matchType } = matchData;
        const newMatch = yield pool_1.db
            .insert(matches_1.matches)
            .values({
            tournamentId,
            player1Id,
            player2Id,
            result,
            matchType
        })
            .returning();
        return newMatch[0];
    }
    catch (error) {
        utils_1.logger.error(`Error creating match: ${error.message}`);
        throw new Error("Error creating match");
    }
});
exports.createMatch = createMatch;
// Update match result by ID
const updateMatchResult = (matchId, result) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMatch = yield pool_1.db
            .update(matches_1.matches)
            .set({ result })
            .where((0, drizzle_orm_1.eq)(matches_1.matches.id, matchId))
            .returning();
        return updatedMatch[0];
    }
    catch (error) {
        utils_1.logger.error(`Error updating match result: ${error.message}`);
        throw new Error("Error updating match result");
    }
});
exports.updateMatchResult = updateMatchResult;
// delete Match by ID
const deleteMatchById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMatch = yield pool_1.db
            .delete(matches_1.matches)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(matches_1.matches.id, id), (0, drizzle_orm_1.eq)(matches_1.matches.player1Id, userId), (0, drizzle_orm_1.eq)(matches_1.matches.player2Id, userId)));
        return deletedMatch;
    }
    catch (err) {
        utils_1.logger.error("Error deleting match: " + err.message);
        throw new Error("Match could not be deleted");
    }
});
exports.deleteMatchById = deleteMatchById;
