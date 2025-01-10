import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { users } from "../schemas/users";
import { hashPassword, verifyPassword } from "../utils";
import { logger } from "../utils";

// Method to find a user by email (used for login)
export const findByCredentials = async (email: string) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .then(results => results[0]);

        return user;
    } catch (error: any) {
        logger.error(`Error finding user by email: ${error.message}`);
        throw new Error("Error finding user by email");
    }
};

// Method to add a new user to the database
export const addUser = async (userData: {
    email: string;
    username: string;
    password: string;
    dateOfBirth: string;
    isMale: boolean;
    eloBullet?: number;
    eloBlitz?: number;
    eloRapid?: number; 
}) => {
    try {
        const { email, username, password, dateOfBirth, isMale, eloBullet = 1200, eloBlitz = 1200, eloRapid = 1200 } = userData;



        const newUser = await db
            .insert(users)
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
    } catch (error: any) {
        logger.error(`Error adding user: ${error.message}`);
        throw new Error("Error adding user");
    }
};

// Login
export const authenticateUser = async (email: string, password: string) => {
    try {
        const user = await findByCredentials(email);
        if (!user) {
            throw new Error("Email or password is incorrect");
        }

        // Verify the password
        const passwordValid = await verifyPassword(user.password, password);
        if (!passwordValid) {
            throw new Error("Email or password is incorrect");
        }

        return user;
    } catch (error: any) {
        logger.error(`Error during user authentication: ${error.message}`);
        throw new Error("Authentication failed");
    }
};
