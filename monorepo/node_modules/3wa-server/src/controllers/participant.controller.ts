// controllers/participantController.ts
import { Request, Response } from "express";
import {
    addParticipant,
    removeParticipant,
    getParticipantsByTournament,
} from "../models/participant.model";
import { APIResponse, logger } from "../utils";

// Ajouter un participant
export const addNewParticipant = async (request: Request, response: Response) => {
    const { tournamentId, userId } = request.body;
    try {
        const participant = await addParticipant({ tournamentId, userId });
        APIResponse(response, participant, "Participant ajouté avec succès", 201);
    } catch (error: any) {
        logger.error(`Error adding participant: ${error.message}`);
        APIResponse(response, null, "Erreur lors de l'ajout du participant", 500);
    }
};

// Supprimer un participant
export const deleteParticipant = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const removedParticipant = await removeParticipant(id);
        if (removedParticipant) {
            APIResponse(response, removedParticipant, "Participant supprimé avec succès");
        } else {
            APIResponse(response, null, "Participant introuvable", 404);
        }
    } catch (error: any) {
        logger.error(`Error removing participant: ${error.message}`);
        APIResponse(response, null, "Erreur lors de la suppression du participant", 500);
    }
};

// Récupérer les participants d'un tournoi
export const getTournamentParticipants = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    try {
        const participants = await getParticipantsByTournament(tournamentId);
        APIResponse(response, participants, "Participants récupérés avec succès");
    } catch (error: any) {
        logger.error(`Error fetching participants: ${error.message}`);
        APIResponse(response, null, "Erreur lors de la récupération des participants", 500);
    }
};
