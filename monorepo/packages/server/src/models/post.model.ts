import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewPost } from "../entities/Post";
import { comments, posts, users } from "../schemas";

import { logger } from "../utils";

// Ce fichier de model corresponds à une écriture + récente de drizzle (method chaining pour les requetes)

export const pushPost = (post: NewPost) => {
    try {
        return db.insert(posts).values(post).returning({ id: posts.id, title: posts.title }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création du post: ${err.message}`);
        throw new Error('Impossible de créer le post')
    }
};

export const findPostById = (id: string) => {
    try {
        return db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            author: {
                id: users.id,
                username: users.username
            },
            comments: {
                id: comments.id,
                content: comments.content,
                createdAt: comments.createdAt
            },
            createdAt: posts.created_at
        }).from(posts)
        .leftJoin( // On veut faire un LEFT JOIN entre la table posts et la table comments
            comments, eq(posts.id, comments.postId) // Lorsque l'id du post est égal à l'id du post dans les commentaires
        ).leftJoin(
            users, eq(posts.author, users.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'user
        ).where( // Nous cherchons le post en fonction de son id
            eq(posts.id, id)
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection du post: ${err.message}`);
        throw new Error('Impossible de récupérer le post')
    }
}


export const findAllPost = () => {
    try {
        return db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            author: {
                id: users.id,
                username: users.username
            },
            comments: {
                id: comments.id,
                content: comments.content,
                createdAt: comments.createdAt
            },
            createdAt: posts.created_at
        }).from(posts)
        .leftJoin( // On veut faire un LEFT JOIN entre la table posts et la table comments
            comments, eq(posts.id, comments.postId) // Lorsque l'id du post est égal à l'id du post dans les commentaires
        ).leftJoin(
            users, eq(posts.author, users.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'user
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la sélection des posts: ${err.message}`);
        throw new Error('Impossible de récupérer les posts')
    }
}

export const deletePost = (id: string, userId: string) => {
    try {
        return db.delete(posts).where(
            and(
                eq(posts.id, id),
                eq(posts.author, userId)
            )
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression du post: ${err.message}`);
        throw new Error('Impossible de supprimer le post')
    }
}


export const updatePost = (id: string, post: NewPost) => {
    try {
        return db.update(posts).set(post).where(
            and(
                eq(posts.id, id),
                eq(posts.author, post.author)
            )
        ).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la mise à jour du post: ${err.message}`);
        return null;
    }
}