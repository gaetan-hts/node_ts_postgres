import { Router } from 'express';

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes"
import tournamentRoutes from "./tournaments.routes"
import participantRoutes from "./participants.routes"
import matchRoutes from "./matches.routes"

const router = Router();

// http://localhost:3000/
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/participant', participantRoutes);
router.use('/match', matchRoutes);

export default router;