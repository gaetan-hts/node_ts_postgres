import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";

const router = Router();

// [GET] http://localhost:3000/users
router.get('/', getUsers);

// [GET] http://localhost:3000/users/:id
router.get('/:id', getUser);

export default router;