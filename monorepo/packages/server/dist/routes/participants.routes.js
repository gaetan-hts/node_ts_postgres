"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participant_controller_1 = require("../controllers/participant.controller");
const router = (0, express_1.Router)();
// [GET] Get all participants by tournament 
router.get('/:id', participant_controller_1.getTournamentParticipants);
// [POST] Create a new participant
router.post('/', participant_controller_1.addNewParticipant);
// [DELETE] Delete a participant
router.delete('/:id', participant_controller_1.deleteParticipant);
exports.default = router;
