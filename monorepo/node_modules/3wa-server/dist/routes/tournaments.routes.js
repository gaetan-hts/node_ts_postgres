"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tournament_controller_1 = require("../controllers/tournament.controller");
const router = (0, express_1.Router)();
// [GET] http://localhost:3000/tournament
router.get('/', tournament_controller_1.fetchAllTournaments);
// [GET] http://localhost:3000/tournament/:id
router.get('/:id', tournament_controller_1.fetchTournamentById);
// [POST] http://localhost:3000/tournament
router.post('/', tournament_controller_1.createNewTournament);
// [PUT] http://localhost:3000/tournament/:id
router.put('/:id', tournament_controller_1.updateTournament);
// [DELETE] http://localhost:3000/tournament/:id
router.delete('/:id', tournament_controller_1.deleteTournament);
exports.default = router;
