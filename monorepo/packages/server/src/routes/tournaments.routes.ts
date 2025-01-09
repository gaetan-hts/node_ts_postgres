import { Router } from "express";
import { createNewTournament, deleteTournament, fetchAllTournaments, fetchTournamentById, updateTournament} from "../controllers/tournament.controller";

const router = Router();

// [GET] Get all tournaments
router.get('/', fetchAllTournaments);

// [GET] Get a specific tournament by ID
router.get('/:id', fetchTournamentById);

// [POST] Create a new tournament
router.post('/', createNewTournament);

// [PUT] Update a tournament's data
router.put('/:id', updateTournament);

// [DELETE] Delete a tournament
router.delete('/:id', deleteTournament);

export default router;
