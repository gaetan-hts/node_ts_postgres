import { Router } from "express";
import { createNewTournament, deleteTournament, fetchAllTournaments, fetchTournamentById, updateTournament } from "../controllers/tournament.controller";

const router = Router();

// [GET] http://localhost:3000/tournament
router.get('/', fetchAllTournaments);

// [GET] http://localhost:3000/tournament/:id
router.get('/:id', fetchTournamentById);

// [POST] http://localhost:3000/tournament
router.post('/', createNewTournament);

// [PUT] http://localhost:3000/tournament/:id
router.put('/:id', updateTournament);

// [DELETE] http://localhost:3000/tournament/:id
router.delete('/:id', deleteTournament);

export default router;
