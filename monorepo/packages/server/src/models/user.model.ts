import { db } from "../config/pool";
import { eq } from "drizzle-orm";
import { users } from "../schemas";
import { User, NewUser } from "../entities/User";
import { logger } from "../utils";

// Ce fichier de model corresponds à une écriture + ancienne de drizzle (method objets pour les requetes)

export const getAllUsers = () => {
    try {
        return db.query.users.findMany({
            columns: {
                id: true,
                username: true
            }
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
        throw new Error("Impossible de récupérer les utilisateurs")
    }
};

export const getUserById = (id: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.id, id),
            columns: {
                id: true,
                username: true
            },
            with: {
                comments: {
                    columns: {
                        id: true,
                        content: true,
                    }
                },
                posts: {
                    columns: {
                        id: true,
                        title: true
                    }
                }
            }
        });

        // En SQL ca donnerait:
        // SELECT id, username, comments.id, comments.content, posts.id, posts.title FROM users WHERE id = 'id' LEFT JOIN comments ON users.id = comments.author LEFT JOIN posts ON users.id = posts.author_id;
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur")
    }
};

export const findByCredentials = (email: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
                email: true,
                username: true,
                password: true
            }
        });
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur")
    }
};

export const addUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur")
    }
};

export const updateUser = (user: Partial<User> & { id: string }) => {
    try {
        return db.update(users).set(user).where(
            eq(users.id, user.id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de màj l'utilisateur; ${err.message}`);
        throw new Error("Impossible de màj l'u'tilisateur")
    }
}