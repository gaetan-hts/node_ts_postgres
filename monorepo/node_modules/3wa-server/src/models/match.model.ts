import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { matches } from "../schemas/matches";
import { logger } from "../utils";
import { users } from "../schemas";

// Fetch match by ID
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

// Fetch matches by tournament ID
export const getMatchesByTournamentId = async (tournamentId: string) => {
    try {
        const tournamentMatches = await db
            .select()
            .from(matches)
            .where(eq(matches.tournamentId, tournamentId));

        return tournamentMatches;
    } catch (error: any) {
        logger.error(`Error fetching matches by tournament ID: ${error.message}`);
        throw new Error(`Error fetching matches by tournament ID: ${error.message}`);
    }
};

// Create new Match
export const createMatch = async (matchData: {
    tournamentId: string;
    player1Id: string;
    player2Id: string;
    result: string;
    matchType: string;
}) => {
    try {
        const { tournamentId, player1Id, player2Id, result, matchType } = matchData;

        // Log input data for debugging
        console.log("Creating match with data:", matchData);

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

        console.log("New match created:", newMatch);

        return newMatch[0];
    } catch (error: any) {
        logger.error(`Error creating match: ${error.message}`);
        // Log stack trace for more details
        console.error(error.stack);
        throw new Error("Error creating match");
    }
};


// Update match result by ID
export const updateMatchResult = async (matchId: string, result: string) => {
    try {
        // Update the match result in the database
        const updatedMatch = await db
            .update(matches)
            .set({ result })
            .where(eq(matches.id, matchId))
            .returning();

        if (updatedMatch.length === 0) {
            throw new Error("Match not found in the database");
        }

        return updatedMatch[0];
    } catch (error: any) {
        logger.error(`Error updating match result: ${error.message}`);
        throw new Error("Error updating match result");
    }
};


// delete Match by ID
export const deleteMatchById = async (id: string, userId: string) => {
    try {
        const deletedMatch = await db
            .delete(matches)
            .where(
                and(
                    eq(matches.id, id),
                    eq(matches.player1Id, userId),
                    eq(matches.player2Id, userId)
                )
            );

        return deletedMatch;
    } catch (err: any) {
        logger.error("Error deleting match: " + err.message);
        throw new Error("Match could not be deleted");
    }
};

export const getUserById = async (id: string) => {
    return db.select().from(users).where(eq(users.id, id)).then(results => results[0]);
};

// Mettre à jour l'ELO d'un utilisateur
export const updateUserElo = async (userId: string, eloField: string, newElo: number) => {
    
    return db
        .update(users)
        .set({ [eloField]: newElo })
        .where(eq(users.id, userId));
}; 