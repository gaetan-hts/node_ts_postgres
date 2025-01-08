import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { users } from "../schemas/users";
import { logger } from "../utils";

// Get all users
export const getUsers = async () => {
    try {
        const usersList = await db.select().from(users);
        return usersList;
    } catch (error: any) {
        logger.error(`Error fetching users: ${error.message}`);
        throw new Error("Error fetching users");
    }
};

// Get a user by ID
export const getUser = async (id: string) => {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)
            .then(results => results[0]);
        return user;
    } catch (error: any) {
        logger.error(`Error fetching user by ID: ${error.message}`);
        throw new Error("Error fetching user by ID");
    }
};
