"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participant_controller_1 = require("../controllers/participant.controller");
const router = (0, express_1.Router)();
// [GET] Get all participants
router.get('/', participant_controller_1.getParticipants);
// [GET] Get a specific participant by ID
router.get('/:id', participant_controller_1.getParticipant);
// [POST] Create a new participant
router.post('/', participant_controller_1.createParticipant);
// [PUT] Update a participant's status
router.put('/:id', participant_controller_1.updateParticipant);
// [DELETE] Delete a participant
router.delete('/:id', participant_controller_1.deleteParticipant);
exports.default = router;
