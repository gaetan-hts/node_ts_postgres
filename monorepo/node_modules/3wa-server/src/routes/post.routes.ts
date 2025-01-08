import { Router } from 'express';
import { createPost, deletePostById, getAllPosts, getPostById, updatePostById } from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// [GET] http://localhost:3000/posts
router.get('/', getAllPosts);

// [GET] http://localhost:3000/posts/65?name=machin&age=25
router.get('/:id', getPostById)

// [POST] http://localhost:3000/posts
router.post('/', authMiddleware, createPost);

// [DELETE] http://localhost:3000/posts/65
router.delete('/:id', authMiddleware, deletePostById);

// [PUT] http://localhost:3000/posts/65
router.put('/:id', authMiddleware, updatePostById);

export default router;