import { Request, Response } from "express";
import { getAllUsers, getUserById } from "../models/user.model";

import { APIResponse, logger } from "../utils"

export const getUsers = async (request: Request, response: Response) => {
    try {
        logger.info("[GET] /users - Récupérer tout les utilisateurs");
        const users = await getAllUsers();

        APIResponse(response, users, "List of all users", 200);
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        APIResponse(response, null, error.message, 500);
    }
}

export const getUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await getUserById(id);

    if (user) {
        APIResponse(response, user, "User found");
    } else {
        APIResponse(response, null, "User not found", 404);
    }
};