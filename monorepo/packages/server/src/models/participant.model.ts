// models/participant.model.ts
import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { participants } from "../schemas/participants";
import { logger } from "../utils";

// Ajouter un participant
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

        return newParticipant[0]; // Retourner le participant ajouté
    } catch (error: any) {
        logger.error(`Error adding participant: ${error.message}`);
        throw new Error("Error adding participant");
    }
};

// Supprimer un participant
export const removeParticipant = async (participantId: string) => {
    try {
        const deletedParticipant = await db
            .delete(participants)
            .where(eq(participants.id, participantId))
            .returning();

        return deletedParticipant[0]; // Retourner le participant supprimé
    } catch (error: any) {
        logger.error(`Error removing participant: ${error.message}`);
        throw new Error("Error removing participant");
    }
};

// Récupérer tous les participants d'un tournoi
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
