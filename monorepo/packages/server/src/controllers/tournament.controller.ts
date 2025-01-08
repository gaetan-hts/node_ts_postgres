// controllers/tournamentController.ts
import { Request, Response } from "express";
import { APIResponse } from "../utils";
import { createTournament, deleteTournamentById, getAllTournaments, getTournamentById, updateTournamentStatus } from "../models/tournament.models";

// Create a new tournament
export const createTournamentController = async (req: Request, res: Response) => {
    try {
        // Validating the incoming data before creating the tournament
        const newTournament = await createTournament(req.body);
        return APIResponse(res, newTournament, "Tournament created successfully", 201);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Get all tournaments
export const getAllTournamentsController = async (req: Request, res: Response) => {
    try {
        const tournamentsList = await getAllTournaments();
        return APIResponse(res, tournamentsList, "Tournaments fetched successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Get a tournament by ID
export const getTournamentByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tournament = await getTournamentById(id);
        if (!tournament) {
            return APIResponse(res, null, "Tournament not found", 404);
        }
        return APIResponse(res, tournament, "Tournament fetched successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Update tournament status
export const updateTournamentStatusController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTournament = await updateTournamentStatus(id, status);
        return APIResponse(res, updatedTournament, "Tournament status updated successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Delete a tournament by ID
export const deleteTournamentByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteTournamentById(id);
        return APIResponse(res, null, "Tournament deleted successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};