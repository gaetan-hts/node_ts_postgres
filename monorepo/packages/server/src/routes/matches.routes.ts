import { Router } from "express";
import { getMatch, updateMatch, deleteMatch, createNewMatch, getMatchesByTournament } from "../controllers/match.controller";

const router = Router();

// [GET] Get all matches
router.get('/tournament/:id', getMatchesByTournament);

// [GET] Get a specific match by ID
router.get('/:id', getMatch);

// [POST] Create a new match
router.post('/', createNewMatch);

// [PUT] Update a match's result or data
router.put('/:id', updateMatch);

// [DELETE] Delete a match
router.delete('/:id', deleteMatch);

export default router;
