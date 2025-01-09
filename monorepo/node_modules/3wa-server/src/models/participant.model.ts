import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { participants } from "../schemas/participants";
import { logger } from "../utils";

// Add a participant
export const addParticipant = async (participantData: { tournamentId: string; userId: string }) => {
    try {
        const { tournamentId, userId } = participantData;

        const newParticipant = await db
            .insert(participants)
            .values({
                tournamentId,
                userId,
            })
            .returning();

        return newParticipant[0];
    } catch (error: any) {
        logger.error(`Error adding participant: ${error.message}`);
        throw new Error("Error adding participant");
    }
};

// Remove a participant
export const removeParticipant = async (participantId: string) => {
    try {
        const deletedParticipant = await db
            .delete(participants)
            .where(eq(participants.id, participantId))
            .returning();

        return deletedParticipant[0];
    } catch (error: any) {
        logger.error(`Error removing participant: ${error.message}`);
        throw new Error("Error removing participant");
    }
};

// Retrieve all participants for a specific tournament
export const getParticipantsByTournament = async (tournamentId: string) => {
    try {
        const tournamentParticipants = await db
            .select()
            .from(participants)
            .where(eq(participants.tournamentId, tournamentId));

        return tournamentParticipants;
    } catch (error: any) {
        logger.error(`Error fetching participants for tournament: ${error.message}`);
        throw new Error("Error fetching participants for tournament");
    }
};
