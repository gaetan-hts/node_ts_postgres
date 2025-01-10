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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.addUser = exports.findByCredentials = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const users_1 = require("../schemas/users");
const utils_1 = require("../utils");
const utils_2 = require("../utils");
// Method to find a user by email (used for login)
const findByCredentials = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield pool_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.email, email))
            .limit(1)
            .then(results => results[0]);
        return user;
    }
    catch (error) {
        utils_2.logger.error(`Error finding user by email: ${error.message}`);
        throw new Error("Error finding user by email");
    }
});
exports.findByCredentials = findByCredentials;
// Method to add a new user to the database
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, dateOfBirth, isMale, eloBullet = 1200, eloBlitz = 1200, eloRapid = 1200 } = userData;
        const newUser = yield pool_1.db
            .insert(users_1.users)
            .values({
            email,
            username,
            password,
            dateOfBirth,
            isMale,
            eloBullet,
            eloBlitz,
            eloRapid
        })
            .returning();
        return newUser[0];
    }
    catch (error) {
        utils_2.logger.error(`Error adding user: ${error.message}`);
        throw new Error("Error adding user");
    }
});
exports.addUser = addUser;
// Login
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findByCredentials)(email);
        if (!user) {
            throw new Error("Email or password is incorrect");
        }
        // Verify the password
        const passwordValid = yield (0, utils_1.verifyPassword)(user.password, password);
        if (!passwordValid) {
            throw new Error("Email or password is incorrect");
        }
        return user;
    }
    catch (error) {
        utils_2.logger.error(`Error during user authentication: ${error.message}`);
        throw new Error("Authentication failed");
    }
});
exports.authenticateUser = authenticateUser;
