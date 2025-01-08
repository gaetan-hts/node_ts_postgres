import { Router } from 'express';

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes"

const router = Router();

// http://localhost:3000/users
router.use('/users', userRoutes);

// http://localhost:3000/auth
router.use('/auth', authRoutes);

export default router;