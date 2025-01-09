// controllers/tournamentController.ts
import { Request, Response } from "express";
import { APIResponse } from "../utils";
import { createTournament, deleteTournamentById, getAllTournaments, getTournamentById, updateTournamentStatus } from "../models/tournament.models";

// Create a new tournament
export const createNewTournament = async (req: Request, res: Response) => {
    try {
        const newTournament = await createTournament(req.body);
        return APIResponse(res, newTournament, "Tournament created successfully", 201);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Get all tournaments
export const fetchAllTournaments = async (req: Request, res: Response) => {
    try {
        const tournamentsList = await getAllTournaments();
        return APIResponse(res, tournamentsList, "Tournaments fetched successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Get tournament by ID
export const fetchTournamentById = async (req: Request, res: Response) => {
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
export const updateTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTournament = await updateTournamentStatus(id, status);
        return APIResponse(res, updatedTournament, "Tournament status updated successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};

// Delete tournament by ID
export const deleteTournament = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteTournamentById(id);
        return APIResponse(res, null, "Tournament deleted successfully", 200);
    } catch (error: any) {
        return APIResponse(res, null, error.message, 500);
    }
};
