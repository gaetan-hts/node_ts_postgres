import { Router } from "express";
import { createComment, getAll, deleteCommentId, findCommentById } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// [GET] http://localhost:3000/comments
router.get('/', getAll);

// [GET] http//localhost:3000/comments/:id
router.get('/:id', findCommentById);

// [POST] http://localhost:3000/comments
router.post('/', authMiddleware, createComment)

// [DELETE] http://localhost:3000/comments/:id
router.delete('/:id', authMiddleware, deleteCommentId);

export default router;