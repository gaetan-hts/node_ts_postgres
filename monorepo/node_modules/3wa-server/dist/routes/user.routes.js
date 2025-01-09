"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// [GET] http://localhost:3000/users
router.get('/', user_controller_1.getAllUsers);
// [GET] http://localhost:3000/users/:id
router.get('/:id', user_controller_1.getUserById);
exports.default = router;
