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
exports.getUser = exports.getUsers = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const users_1 = require("../schemas/users");
const utils_1 = require("../utils");
// Get all users
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersList = yield pool_1.db.select().from(users_1.users);
        return usersList;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching users: ${error.message}`);
        throw new Error("Error fetching users");
    }
});
exports.getUsers = getUsers;
// Get a user by ID
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield pool_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.id, id))
            .limit(1)
            .then(results => results[0]);
        return user;
    }
    catch (error) {
        utils_1.logger.error(`Error fetching user by ID: ${error.message}`);
        throw new Error("Error fetching user by ID");
    }
});
exports.getUser = getUser;
