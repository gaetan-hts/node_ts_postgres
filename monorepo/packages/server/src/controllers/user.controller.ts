import { Request, Response } from "express";
import { getUsers, getUser } from "../models/user.model";
import { APIResponse, logger } from "../utils";

// Récupérer tous les utilisateurs
export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await getUsers();
        APIResponse(response, users, "Utilisateurs récupérés avec succès");
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        APIResponse(response, null, "Erreur lors de la récupération des utilisateurs", 500);
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (request: Request, response: Response) => {
    const { id } = request.params;

    
    try {
        const user = await getUser(id);
        if (user) {
            APIResponse(response, user, "Utilisateur récupéré avec succès");
        } else {
            APIResponse(response, null, "Utilisateur introuvable", 404);
        }
    } catch (error: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
        APIResponse(response, null, "Erreur lors de la récupération de l'utilisateur", 500);
    }
};
