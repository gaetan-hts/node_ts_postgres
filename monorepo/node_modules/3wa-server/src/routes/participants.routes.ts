import { Router } from "express";
import { addNewParticipant, deleteParticipant, getTournamentParticipants } from "../controllers/participant.controller";

const router = Router();

// [GET] Get all participants by tournament 
router.get('/:id', getTournamentParticipants);

// [POST] Create a new participant
router.post('/', addNewParticipant);

// [DELETE] Delete a participant
router.delete('/:id', deleteParticipant);

export default router;
