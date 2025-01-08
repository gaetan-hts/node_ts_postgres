import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";

const router = Router();

// [POST] http://localhost:3000/auth/register
router.post('/register', register);

// [POST] http://localhost:3000/auth/login
router.post('/login', login);

// [POST] http://localhost:3000/auth/logout
router.get('/logout', logout);

export default router;