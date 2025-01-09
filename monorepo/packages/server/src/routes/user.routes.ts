import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller";

const router = Router();

// [GET] http://localhost:3000/users
router.get('/', getAllUsers);

// [GET] http://localhost:3000/users/:id
router.get('/:id', getUserById);

export default router;