import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { matches } from "../schemas/matches"; // Your schema for matches
import { logger } from "../utils";

export const getMatchById = async (id: string) => {
    try {
        const match = await db
            .select()
            .from(matches)
            .where(eq(matches.id, id))
            .limit(1)
            .then(results => results[0]);

        return match;
    } catch (error: any) {
        logger.error(`Error fetching match by ID: ${error.message}`);
        throw new Error(`Error fetching match by ID: ${error.message}`);
    }
};

export const createMatch = async (matchData: {
    tournamentId: string;
    player1Id: string;
    player2Id: string;
    result: string;
    matchType: string;
}) => {
    try {
        const { tournamentId, player1Id, player2Id, result, matchType } = matchData;

        const newMatch = await db
            .insert(matches)
            .values({
                tournamentId,
                player1Id,
                player2Id,
                result,
                matchType
            })
            .returning();

        return newMatch[0]; // Returning the inserted match object
    } catch (error: any) {
        logger.error(`Error creating match: ${error.message}`);
        throw new Error("Error creating match");
    }
};

export const updateMatchResult = async (matchId: string, result: string) => {
    try {
        const updatedMatch = await db
            .update(matches)
            .set({ result })
            .where(eq(matches.id, matchId))
            .returning();

        return updatedMatch[0]; // Returning the updated match object
    } catch (error: any) {
        logger.error(`Error updating match result: ${error.message}`);
        throw new Error("Error updating match result");
    }
};

export const deleteMatchById = async (id: string, userId: string) => {
    try {
        // Assuming that matches have a userId field or a relationship to track who owns the match
        const deletedMatch = await db
            .delete(matches)
            .where(
                and(
                    eq(matches.id, id),
                    eq(matches.player1Id, userId),
                    eq(matches.player2Id, userId)
                )
            );

        return deletedMatch; // Returning deleted match result
    } catch (err: any) {
        logger.error("Error deleting match: " + err.message);
        throw new Error("Match could not be deleted");
    }
};