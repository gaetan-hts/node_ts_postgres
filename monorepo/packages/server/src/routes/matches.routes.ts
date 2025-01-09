import { Router } from "express";
import { getMatch, updateMatch, deleteMatch, createNewMatch, getMatchesByTournament } from "../controllers/match.controller";

const router = Router();

// [GET] http://localhost:3000/match/tournament/:id
router.get('/tournament/:id', getMatchesByTournament);

// [GET] http://localhost:3000/match/:id
router.get('/:id', getMatch);

// [POST] http://localhost:3000/match
router.post('/', createNewMatch);

// [PUT] http://localhost:3000/match/:id
router.put('/:id', updateMatch);

// [DELETE] http://localhost:3000/match/:id
router.delete('/:id', deleteMatch);

export default router;
