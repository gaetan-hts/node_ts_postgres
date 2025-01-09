import { Request, Response } from "express";
import { getMatchById, createMatch, updateMatchResult, deleteMatchById, getMatchesByTournamentId } from "../models/match.model";
import { APIResponse, logger } from "../utils";

// Fetch match by ID
export const getMatch = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const match = await getMatchById(id);
        if (match) {
            APIResponse(response, match, "Match found");
        } else {
            APIResponse(response, null, "Match not found", 404);
        }
    } catch (error: any) {
        logger.error(`Error fetching match by ID: ${error.message}`);
        APIResponse(response, null, "Error fetching match by ID", 500);
    } 
};

// Fetch matches by tournament ID
export const getMatchesByTournament = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    try {
        const matches = await getMatchesByTournamentId(tournamentId);
        if (matches.length > 0) {
            APIResponse(response, matches, "Matches retrieved successfully");
        } else {
            APIResponse(response, null, "No matches found for this tournament", 404);
        }
    } catch (error: any) {
        logger.error(`Error fetching matches by tournament ID: ${error.message}`);
        APIResponse(response, null, "Error fetching matches by tournament ID", 500);
    }
};

// Create new match
export const createNewMatch = async (request: Request, response: Response) => {
    const { tournamentId, player1Id, player2Id, result, matchType } = request.body;
    try {
        const newMatch = await createMatch({ tournamentId, player1Id, player2Id, result, matchType });
        APIResponse(response, newMatch, "Match created successfully", 201);
    } catch (error: any) {
        logger.error(`Error creating match: ${error.message}`);
        APIResponse(response, null, "Error creating match", 500);
    }
};

// Update existing match by ID 
export const updateMatch = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { result } = request.body;
    
    try {
        const updatedMatch = await updateMatchResult(id, result);
        if (updatedMatch) {
            APIResponse(response, updatedMatch, "Match result updated successfully");
        } else {
            APIResponse(response, null, "Match not found or result not updated", 404);
        }
    } catch (error: any) {
        logger.error(`Error updating match result: ${error.message}`);
        APIResponse(response, null, "Error updating match result", 500);
    }
};

// Delete match by ID
export const deleteMatch = async (request: Request, response: Response) => {
    const { matchId } = request.params;
    const { userId } = request.body;
    try {
        const deletedMatch = await deleteMatchById(matchId, userId);
        if (deletedMatch) {
            APIResponse(response, deletedMatch, "Match deleted successfully");
        } else {
            APIResponse(response, null, "Match not found or cannot be deleted", 404);
        }
    } catch (error: any) {
        logger.error(`Error deleting match: ${error.message}`);
        APIResponse(response, null, "Error deleting match", 500);
    }
};
