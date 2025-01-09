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
// Base URL: http://localhost:3000/auth
router.use('/auth', auth_routes_1.default);
// Base URL: http://localhost:3000/user
router.use('/user', user_routes_1.default);
// Base URL: http://localhost:3000/tournament
router.use('/tournament', tournaments_routes_1.default);
// Base URL: http://localhost:3000/participant
router.use('/participant', participants_routes_1.default);
// Base URL: http://localhost:3000/match
router.use('/match', matches_routes_1.default);
exports.default = router;
