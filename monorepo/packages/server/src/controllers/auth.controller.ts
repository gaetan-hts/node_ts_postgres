import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { env } from "../config/env";

import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { userValidation } from "../validation/users.validation"
import { addUser, findByCredentials } from "../models/user.model";

const { NODE_ENV, JWT_SECRET } = env;

export const register = async (request: Request, response: Response) => {
    try {
        const { email, password, username } = userValidation.parse(request.body);
        const emailAlreadyExists = await findByCredentials(email);
        if (emailAlreadyExists)
            return APIResponse(response, [], "Cet email est déjà utilisé", 400);

        const hash = await hashPassword(password);
        if (!hash)
            throw new Error("Erreur lors du hashage du mot de passe");

        const [ newUser ] = await addUser({ username, email, password: hash });
        if (!newUser)
            return APIResponse(response, [], "Erreur lors de la création de l'utilisateur", 500); 

        return APIResponse(response, newUser.id, "Vous êtes inscrit", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`)
        if (err instanceof z.ZodError) {
            // ici on retourne les erreurs de validation
            return APIResponse(response, err.errors, "Formulaire incorrect", 400)
        }
        APIResponse(response, null, "Erreur serveur", 500);
    }
}

export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const user = await findByCredentials(email);
        if (!user)
            return APIResponse(response, [], "Email ou mot de passe invalide", 400);

        // vérification du mot de passe
        if (await verifyPassword(user.password, password) === false) {
            return APIResponse(response, [], "Email ou mot de passe invalide", 400);
        }

        // email + mdp corrects
        // Génération des tokens refresh/access (continuer à rester connecté après une longue periode d'activité)
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // On ajoute les cookies: il faut bien que ces deux tokens servent à quelque chose: on aura 2 cookies, un de la valeur de l'accesstoken et un autre du refresh token
        response.cookie('accessToken', accessToken, {
            httpOnly: true, // true empêche l'accès au cookie en javascript: accessible uniquement via communication http
            sameSite: 'strict', // protége contre les attaques CSRF
            secure: NODE_ENV === "production" // signifie que le cookie ne sera envoyé que sur du HTTPS
        });

        APIResponse(response, null, "Vous êtes connecté", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
        APIResponse(response, null, "Erreur serveur", 500);
    }
}

export const logout = (request: Request, response: Response) => {
    response.clearCookie('accessToken');
    APIResponse(response, null, "Vous êtes déconnecté", 200);
}