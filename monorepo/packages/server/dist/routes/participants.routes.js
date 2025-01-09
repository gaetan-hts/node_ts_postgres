"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participant_controller_1 = require("../controllers/participant.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// [GET] http://localhost:3000/participant/:id
router.get('/:id', participant_controller_1.getTournamentParticipants);
// [POST] http://localhost:3000/participant
router.post('/', [auth_middleware_1.authMiddleware], participant_controller_1.addNewParticipant);
// [DELETE] http://localhost:3000/participant/:id
router.delete('/:id', participant_controller_1.deleteParticipant);
exports.default = router;
