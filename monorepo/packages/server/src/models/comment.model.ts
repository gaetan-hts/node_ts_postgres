import { eq, and } from "drizzle-orm";
import { db } from "../config/pool";
import { NewComment } from "../entities/Comment";
import { comments, users, posts } from "../schemas";
import { logger } from "../utils";

export const pushComment = (comment: NewComment) => {
    try {
        return db.insert(comments).values(comment).execute();
    } catch (err: any) {
        logger.error("Impossible de créer le commentaire " + err.message)
        throw new Error("Le commentaire ne peut pas être crée");
    }
};

export const deleteCommentById = (id: string, userId: string) => {
    try {
        return db.delete(comments).where(
            and(
                eq(comments.id, id),
                eq(comments.authorId, userId)
            )
        )
    } catch (err: any) {
        logger.error("Impossible de supprimer le commentaire " + err.message)
        throw new Error("Le commentaire ne peut pas être supprimé");
    }
};

export const findAllComments = () => {
    try {
        return db.select({
            id: comments.id,
            content: comments.content,
            post: {
                id: posts.id,
                title: posts.title
            },
            author: {
                id: users.id,
                username: users.username
            }
        }).from(comments)
        .leftJoin(
            users, eq(users.id, comments.authorId)
        ).leftJoin(
            posts, eq(posts.id, comments.postId)
        ).execute();
    } catch (err: any) {
        logger.error("Impossible de récupérer les commentaires " + err.message)
        return [];
    }
}

export const getCommentById = (id: string) => {
    try {
        return db.select({
            id: comments.id,
            content: comments.content,
            author: {
                id: users.id,
                username: users.username
            }
        }).from(comments)
        .leftJoin(
            users, eq(users.id, comments.authorId)
        ).where(
            eq(comments.id, id)
        ).execute();
    } catch (err: any) {
        logger.error("Impossible de récupérer le commentaire " + err.message)
        throw new Error("Le commentaire ne peut pas être recupéré");
    }
}