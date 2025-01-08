"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
// [GET] Get all matches
router.get('/', match_controller_1.getMatches);
// [GET] Get a specific match by ID
router.get('/:id', match_controller_1.getMatch);
// [POST] Create a new match
router.post('/', match_controller_1.createMatch);
// [PUT] Update a match's result or data
router.put('/:id', match_controller_1.updateMatch);
// [DELETE] Delete a match
router.delete('/:id', match_controller_1.deleteMatch);
exports.default = router;
