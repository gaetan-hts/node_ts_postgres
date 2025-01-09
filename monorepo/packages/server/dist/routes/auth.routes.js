"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// [POST] http://localhost:3000/auth/register
router.post('/register', auth_controller_1.register);
// [POST] http://localhost:3000/auth/login
router.post('/login', auth_controller_1.login);
// [GET] http://localhost:3000/auth/logout
router.get('/logout', auth_controller_1.logout);
exports.default = router;
