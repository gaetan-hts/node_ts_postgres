import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { env } from "../config/env";

import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { userValidation } from "../validation/users.validation";
import { addUser, findByCredentials } from "../models/auth.models";

const { NODE_ENV, JWT_SECRET } = env;

// Register
export const register = async (request: Request, response: Response) => {
    try {
        const {
          email,
          password,
          username,
          dateOfBirth,
          isMale,
          eloBullet,
          eloBlitz,
          eloRapid,
        } = userValidation.parse(request.body);

        // Check if the email is already in use
        const emailAlreadyExists = await findByCredentials(email);
        if (emailAlreadyExists)
            return APIResponse(response, [], "This email is already in use", 400);

        // Hash the password
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword)
            throw new Error("Error hashing the password");

        // Add the user to the database
        const newUser = await addUser({
            username,
            email,
            password: hashedPassword,
            dateOfBirth,
            isMale,
            eloBullet,
            eloBlitz,
            eloRapid,
        });

        if (!newUser) {
            return APIResponse(response, [], "Error creating the user", 500);
        }

        // Respond with the new user's ID
        return APIResponse(response, newUser.id, "You are registered", 200);
    } catch (err: any) {
        logger.error(`Error during user registration: ${err.message}`);

        // Return validation errors if present
        if (err instanceof z.ZodError) {
            return APIResponse(response, err.errors, "Invalid form", 400);
        }

        // Respond with a server error
        APIResponse(response, null, "Server error", 500);
    }
};

//Login
export const login = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const user = await findByCredentials(email);

        if (!user)
            return APIResponse(response, [], "Invalid email or password", 400);
        
        // Verify the password
        if (await verifyPassword(user.password, password) === false) {
            return APIResponse(response, [user], "Invalid email or password", 400);
        }

        // Email and password are correct
        // Generate refresh/access tokens to maintain session even after inactivity
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Add cookies: accessToken and refreshToken for session management
        response.cookie('accessToken', accessToken, {
            httpOnly: true, // Prevent access to the cookie via JavaScript, accessible only through HTTP communication
            sameSite: 'strict', // Protects against CSRF attacks
            secure: NODE_ENV === "production" // Ensures the cookie is sent only over HTTPS
        });

        APIResponse(response, null, "You are logged in", 200);
    } catch (err: any) {
        logger.error(`Error during user login: ${err.message}`);
        APIResponse(response, null, "Server error", 500);
    }
};

//Logout
export const logout = (request: Request, response: Response) => {
    // Clear the accessToken cookie
    response.clearCookie('accessToken');
    APIResponse(response, null, "You are logged out", 200);
};
