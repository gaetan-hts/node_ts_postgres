"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = exports.registerController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const users_validation_1 = require("../validation/users.validation");
const utils_1 = require("../utils");
const env_1 = require("../config/env");
const auth_models_1 = require("../models/auth.models");
const { JWT_SECRET } = env_1.env;
// Controller to register a new user
const registerController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body using the Zod schema
        const validatedUser = users_validation_1.userValidation.parse(request.body);
        // Add the new user to the database
        const newUser = yield (0, auth_models_1.addUser)(validatedUser);
        return (0, utils_1.APIResponse)(response, newUser, "User registered successfully", 201);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return (0, utils_1.APIResponse)(response, error.errors, "Validation error", 400);
        }
        utils_1.logger.error(`Error during registration: ${error.message}`);
        return (0, utils_1.APIResponse)(response, null, "Server error during registration", 500);
    }
});
exports.registerController = registerController;
// Controller to log in a user
const loginController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // Authenticate the user
        const user = yield (0, auth_models_1.authenticateUser)(email, password);
        // Generate JWT tokens
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // Send the token as a cookie
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
        });
        // Return the authenticated user details
        return (0, utils_1.APIResponse)(response, user, "User logged in successfully", 200);
    }
    catch (error) {
        utils_1.logger.error(`Error during login: ${error.message}`);
        return (0, utils_1.APIResponse)(response, null, "Authentication failed", 400);
    }
});
exports.loginController = loginController;
// Controller to log out a user
const logoutController = (request, response) => {
    try {
        // Clear the cookies
        response.clearCookie('accessToken');
        // Return response
        return (0, utils_1.APIResponse)(response, null, "User logged out successfully", 200);
    }
    catch (error) {
        utils_1.logger.error(`Error during logout: ${error.message}`);
        return (0, utils_1.APIResponse)(response, null, "Server error during logout", 500);
    }
};
exports.logoutController = logoutController;
