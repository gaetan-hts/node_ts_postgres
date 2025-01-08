import { Router } from "express";
import { getMatch, getMatches, createMatch, updateMatch, deleteMatch } from "../controllers/match.controller";

const router = Router();

// [GET] Get all matches
router.get('/', getMatches);

// [GET] Get a specific match by ID
router.get('/:id', getMatch);

// [POST] Create a new match
router.post('/', createMatch);

// [PUT] Update a match's result or data
router.put('/:id', updateMatch);

// [DELETE] Delete a match
router.delete('/:id', deleteMatch);

export default router;
