import { Router } from "express";
import { getParticipant, getParticipants, createParticipant, updateParticipant, deleteParticipant } from "../controllers/participant.controller";

const router = Router();

// [GET] Get all participants
router.get('/', getParticipants);

// [GET] Get a specific participant by ID
router.get('/:id', getParticipant);

// [POST] Create a new participant
router.post('/', createParticipant);

// [PUT] Update a participant's status
router.put('/:id', updateParticipant);

// [DELETE] Delete a participant
router.delete('/:id', deleteParticipant);

export default router;
