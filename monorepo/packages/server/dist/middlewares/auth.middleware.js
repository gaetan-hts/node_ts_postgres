"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const utils_1 = require("../utils");
const { JWT_SECRET } = env_1.env;
const authMiddleware = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return (0, utils_1.APIResponse)(res, null, 'Vous devez être connecté', 401);
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        res.locals.user = decoded;
        next();
    }
    catch (err) {
        return (0, utils_1.APIResponse)(res, null, 'Token invalide', 401);
    }
};
exports.authMiddleware = authMiddleware;
