import { Request, Response } from "express";
import { getMatchById, createMatch, updateMatchResult, deleteMatchById, getMatchesByTournamentId, getUserById, updateUserElo } from "../models/match.model";
import { APIResponse, logger } from "../utils";
import { updateElo } from "../utils/elo";

type EloField = "eloBullet" | "eloBlitz" | "eloRapid";


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

export const createNewMatch = async (request: Request, response: Response) => {
    const { tournamentId, player1Id, player2Id, result, matchType } = request.body;
    console.log(tournamentId, player1Id, player2Id, result, matchType);

    try {
        const newMatch = await createMatch({ tournamentId, player1Id, player2Id, result, matchType });

        // Logique de mise à jour de l'ELO
        if (result === "player1" || result === "player2" || result === "draw") {
            await handleEloUpdate(player1Id, player2Id, result, matchType);
        }
        
        APIResponse(response, newMatch, "Match created successfully", 201);
    } catch (error: any) {
        logger.error(`Error creating match: ${error.message}`);
        APIResponse(response, null, "Error creating match", 500);
    }
};

export const updateMatch = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { result } = request.body;

    // Validate input
    if (!["player1", "player2", "draw"].includes(result)) {
        APIResponse(response, null, "Invalid result value", 400);
        return;
    }

    try {
        // Fetch the match by ID
        const match = await getMatchById(id);

        if (!match) {
            APIResponse(response, null, "Match not found", 404);
            return;
        }

        // Update the match result
        const updatedMatch = await updateMatchResult(id, result);

        // Update ELO ratings if result is valid
        if (result === "player1" || result === "player2" || result === "draw") {
            await handleEloUpdate(match.player1Id, match.player2Id, result, match.matchType);
        }

        APIResponse(response, updatedMatch, "Match result updated successfully");
    } catch (error: any) {
        logger.error(`Error updating match result: ${error.message}`);
        APIResponse(response, null, "Error updating match result", 500);
    }
};


// Fonction pour gérer la mise à jour de l'ELO
const handleEloUpdate = async (
    player1Id: string,
    player2Id: string,
    result: string,
    matchType: string
) => {
  const player1 = await getUserById(player1Id);
  const player2 = await getUserById(player2Id);

  if (!player1 || !player2) {
    throw new Error("One or both players not found");
  }

  // Convertir le type de match en clé ELO
  const eloField: EloField = `elo${capitalize(matchType)}` as EloField;
  
  if (!(eloField in player1)) {
    throw new Error(`ELO field ${eloField} not found in player1`);
}
if (!(eloField in player2)) {
    throw new Error(`ELO field ${eloField} not found in player2`);
}
  console.log("Match type:", matchType);
  console.log("ELO Field:", eloField);
  console.log("Player 1:", player1);
  console.log("Player 2:", player2);

  // Récupérer les ELO des deux joueurs
  const player1Elo = player1[eloField];
  const player2Elo = player2[eloField];

  // Calculer les nouveaux ELO
  const { newElo1, newElo2 } = updateElo(player1Elo, player2Elo, result);

  // Mettre à jour les ELO dans la base de données
  await updateUserElo(player1Id, eloField, newElo1);
  await updateUserElo(player2Id, eloField, newElo2);
};


// Fonction utilitaire pour capitaliser un mot
function capitalize(matchType: string): string {
    const map: Record<string, string> = {
        bullet: "Bullet",
        blitz: "Blitz",
        rapide: "Rapid",
    };

    return map[matchType] || matchType.charAt(0).toUpperCase() + matchType.slice(1).toLowerCase();
}



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
