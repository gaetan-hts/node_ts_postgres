import { Router } from 'express';

import userRoutes from "./user.routes";
import authRoutes from "./auth.routes"
import postRoutes from "./post.routes"
import commentRoutes from "./comment.routes"

const router = Router();

// http://localhost:3000/users
router.use('/users', userRoutes);

// http://localhost:3000/auth
router.use('/auth', authRoutes)

// http://localhost:3000/posts
router.use('/posts', postRoutes);

// http://localhost:3000/comments
router.use('/comments', commentRoutes);

export default router;