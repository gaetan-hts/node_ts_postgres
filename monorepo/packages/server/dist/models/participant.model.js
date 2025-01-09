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
exports.getParticipantsByTournament = exports.removeParticipant = exports.addParticipant = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const participants_1 = require("../schemas/participants");
const utils_1 = require("../utils");
// Add a participant
const addParticipant = (participantData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tournamentId, userId } = participantData;
        const newParticipant = yield pool_1.db
            .insert(participants_1.participants)
            .values({
            tournamentId,
            userId,
        })
            .returning();
        return newParticipant[0];
    }
    catch (error) {
        utils_1.logger.error(`Error adding participant: ${error.message}`);
        throw new Error("Error adding participant");
    }
});
exports.addParticipant = addParticipant;
// Remove a participant
const removeParticipant = (participantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedParticipant = yield pool_1.db
            .delete(participants_1.participants)
            .where((0, drizzle_orm_1.eq)(participants_1.participants.id, participantId))
            .returning();
        return deletedParticipant[0];
    }
    catch (error) {
        utils_1.logger.error(`Error removing participant: ${error.message}`);
        throw new Error("Error removing participant");
    }
});
exports.removeParticipant = removeParticipant;
// Retrieve all participants for a specific tournament
const getParticipantsByTournament = (tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournamentParticipants = yield pool_1.db
            .select()
            .from(participants_1.participants)
            .where((0, drizzle_orm_1.eq)(participants_1.participants.tournamentId, tournamentId));
        return tournamentParticipants;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching participants for tournament: ${error.message}`);
        throw new Error("Error fetching participants for tournament");
    }
});
exports.getParticipantsByTournament = getParticipantsByTournament;
