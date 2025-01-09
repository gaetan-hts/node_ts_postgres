"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
// [GET] http://localhost:3000/match/tournament/:id
router.get('/tournament/:id', match_controller_1.getMatchesByTournament);
// [GET] http://localhost:3000/match/:id
router.get('/:id', match_controller_1.getMatch);
// [POST] http://localhost:3000/match
router.post('/', match_controller_1.createNewMatch);
// [PUT] http://localhost:3000/match/:id
router.put('/:id', match_controller_1.updateMatch);
// [DELETE] http://localhost:3000/match/:id
router.delete('/:id', match_controller_1.deleteMatch);
exports.default = router;
