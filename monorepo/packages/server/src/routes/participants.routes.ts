import { Router } from "express";
import { addNewParticipant, deleteParticipant, getTournamentParticipants } from "../controllers/participant.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// [GET] http://localhost:3000/participant/:id
router.get('/:id', getTournamentParticipants);

// [POST] http://localhost:3000/participant
router.post('/', [authMiddleware], addNewParticipant);

// [DELETE] http://localhost:3000/participant/:id
router.delete('/:id', deleteParticipant);

export default router;
