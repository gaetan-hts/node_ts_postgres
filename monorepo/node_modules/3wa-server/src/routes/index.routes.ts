import { Router } from 'express';

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import tournamentRoutes from "./tournaments.routes";
import participantRoutes from "./participants.routes";
import matchRoutes from "./matches.routes";

const router = Router();

// Base URL: http://localhost:3000/auth
router.use('/auth', authRoutes);

// Base URL: http://localhost:3000/user
router.use('/user', userRoutes);

// Base URL: http://localhost:3000/tournament
router.use('/tournament', tournamentRoutes);

// Base URL: http://localhost:3000/participant
router.use('/participant', participantRoutes);

// Base URL: http://localhost:3000/match
router.use('/match', matchRoutes);

export default router;
