import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userValidation } from "../validation/users.validation";
import { APIResponse, logger } from "../utils";
import { env } from "../config/env";
import { addUser, authenticateUser } from "../models/auth.models";

const { JWT_SECRET } = env;

// Controller to register a new user
export const registerController = async (request: Request, response: Response) => {
    try {
        // Validate the request body using the Zod schema
        const validatedUser = userValidation.parse(request.body);

        // Add the new user to the database
        const newUser = await addUser(validatedUser);
        return APIResponse(response, newUser, "User registered successfully", 201);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return APIResponse(response, error.errors, "Validation error", 400);
        }
        logger.error(`Error during registration: ${error.message}`);
        return APIResponse(response, null, "Server error during registration", 500);
    }
};

// Controller to log in a user
export const loginController = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        // Authenticate the user
        const user = await authenticateUser(email, password);

        // Generate JWT tokens
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the token as a cookie
        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
        });

        // Return the authenticated user details
        return APIResponse(response, user, "User logged in successfully", 200);
    } catch (error: any) {
        logger.error(`Error during login: ${error.message}`);
        return APIResponse(response, null, "Authentication failed", 400);
    }
};

// Controller to log out a user
export const logoutController = (request: Request, response: Response) => {
    try {
        // Clear the cookies
        response.clearCookie('accessToken');

        // Return response
        return APIResponse(response, null, "User logged out successfully", 200);
    } catch (error: any) {
        logger.error(`Error during logout: ${error.message}`);
        return APIResponse(response, null, "Server error during logout", 500);
    }
};
