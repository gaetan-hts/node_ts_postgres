"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const tournaments_routes_1 = __importDefault(require("./tournaments.routes"));
const participants_routes_1 = __importDefault(require("./participants.routes"));
const matches_routes_1 = __importDefault(require("./matches.routes"));
const router = (0, express_1.Router)();
// http://localhost:3000/
router.use('/auth', auth_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/tournament', tournaments_routes_1.default);
router.use('/participant', participants_routes_1.default);
router.use('/match', matches_routes_1.default);
exports.default = router;
