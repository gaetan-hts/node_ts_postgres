// models/tournament.ts
import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { tournaments } from "../schemas/tournaments"; // Your schema for tournaments
import { logger } from "../utils";

// Create a new tournament
export const createTournament = async (tournamentData: {
    name: string;
    type: string;
    startDate: string;
    endDate?: string;
    status?: string;
    ranking?: any;
}) => {
    try {
        const { name, type, startDate, endDate, status = "scheduled", ranking } = tournamentData;

        const newTournament = await db
            .insert(tournaments)
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
    } catch (error: any) {
        logger.error(`Error creating tournament: ${error.message}`);
        throw new Error("Error creating tournament");
    }
};

// Get all tournaments
export const getAllTournaments = async () => {
    try {
        const tournamentsList = await db.select().from(tournaments);
        return tournamentsList;
    } catch (error: any) {
        logger.error(`Error fetching tournaments: ${error.message}`);
        throw new Error("Error fetching tournaments");
    }
};

// Get a tournament by ID
export const getTournamentById = async (id: string) => {
    try {
        const tournament = await db
            .select()
            .from(tournaments)
            .where(eq(tournaments.id, id))
            .limit(1)
            .then(results => results[0]);

        return tournament;
    } catch (error: any) {
        logger.error(`Error fetching tournament by ID: ${error.message}`);
        throw new Error(`Error fetching tournament by ID: ${error.message}`);
    }
};

// Update tournament status
export const updateTournamentStatus = async (id: string, status: string) => {
    try {
        const updatedTournament = await db
            .update(tournaments)
            .set({ status })
            .where(eq(tournaments.id, id))
            .returning();

        return updatedTournament[0]; // Returning the updated tournament object
    } catch (error: any) {
        logger.error(`Error updating tournament status: ${error.message}`);
        throw new Error("Error updating tournament status");
    }
};

// Delete a tournament by ID
export const deleteTournamentById = async (id: string) => {
    try {
        const deletedTournament = await db
            .delete(tournaments)
            .where(eq(tournaments.id, id));

        return deletedTournament; // Returning deleted tournament result
    } catch (error: any) {
        logger.error(`Error deleting tournament: ${error.message}`);
        throw new Error("Tournament could not be deleted");
    }
};
