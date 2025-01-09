"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tournament_controller_1 = require("../controllers/tournament.controller");
const router = (0, express_1.Router)();
// [GET] Get all tournaments
router.get('/', tournament_controller_1.fetchAllTournaments);
// [GET] Get a specific tournament by ID
router.get('/:id', tournament_controller_1.fetchTournamentById);
// [POST] Create a new tournament
router.post('/', tournament_controller_1.createNewTournament);
// [PUT] Update a tournament's data
router.put('/:id', tournament_controller_1.updateTournament);
// [DELETE] Delete a tournament
router.delete('/:id', tournament_controller_1.deleteTournament);
exports.default = router;
