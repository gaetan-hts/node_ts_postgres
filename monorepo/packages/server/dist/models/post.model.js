"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.findAllPost = exports.findPostById = exports.pushPost = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
// Ce fichier de model corresponds à une écriture + récente de drizzle (method chaining pour les requetes)
const pushPost = (post) => {
    try {
        return pool_1.db.insert(schemas_1.posts).values(post).returning({ id: schemas_1.posts.id, title: schemas_1.posts.title }).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création du post: ${err.message}`);
        throw new Error('Impossible de créer le post');
    }
};
exports.pushPost = pushPost;
const findPostById = (id) => {
    try {
        return pool_1.db.select({
            id: schemas_1.posts.id,
            title: schemas_1.posts.title,
            content: schemas_1.posts.content,
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username
            },
            comments: {
                id: schemas_1.comments.id,
                content: schemas_1.comments.content,
                createdAt: schemas_1.comments.createdAt
            },
            createdAt: schemas_1.posts.created_at
        }).from(schemas_1.posts)
            .leftJoin(// On veut faire un LEFT JOIN entre la table posts et la table comments
        schemas_1.comments, (0, drizzle_orm_1.eq)(schemas_1.posts.id, schemas_1.comments.postId) // Lorsque l'id du post est égal à l'id du post dans les commentaires
        ).leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.posts.author, schemas_1.users.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'user
        ).where(// Nous cherchons le post en fonction de son id
        (0, drizzle_orm_1.eq)(schemas_1.posts.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la sélection du post: ${err.message}`);
        throw new Error('Impossible de récupérer le post');
    }
};
exports.findPostById = findPostById;
const findAllPost = () => {
    try {
        return pool_1.db.select({
            id: schemas_1.posts.id,
            title: schemas_1.posts.title,
            content: schemas_1.posts.content,
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username
            },
            comments: {
                id: schemas_1.comments.id,
                content: schemas_1.comments.content,
                createdAt: schemas_1.comments.createdAt
            },
            createdAt: schemas_1.posts.created_at
        }).from(schemas_1.posts)
            .leftJoin(// On veut faire un LEFT JOIN entre la table posts et la table comments
        schemas_1.comments, (0, drizzle_orm_1.eq)(schemas_1.posts.id, schemas_1.comments.postId) // Lorsque l'id du post est égal à l'id du post dans les commentaires
        ).leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.posts.author, schemas_1.users.id) // Lorsque l'id de l'auteur du post est égal à l'id de l'user
        ).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la sélection des posts: ${err.message}`);
        throw new Error('Impossible de récupérer les posts');
    }
};
exports.findAllPost = findAllPost;
const deletePost = (id) => {
    try {
        return pool_1.db.delete(schemas_1.posts).where((0, drizzle_orm_1.eq)(schemas_1.posts.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la suppression du post: ${err.message}`);
        throw new Error('Impossible de supprimer le post');
    }
};
exports.deletePost = deletePost;
