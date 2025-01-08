import { Router } from "express";
import { getTournament, getTournaments, createTournament, updateTournament, deleteTournament } from "../controllers/tournament.controller";

const router = Router();

// [GET] Get all tournaments
router.get('/', getTournaments);

// [GET] Get a specific tournament by ID
router.get('/:id', getTournament);

// [POST] Create a new tournament
router.post('/', createTournament);

// [PUT] Update a tournament's data
router.put('/:id', updateTournament);

// [DELETE] Delete a tournament
router.delete('/:id', deleteTournament);

export default router;
