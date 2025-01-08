"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.findAllComments = exports.deleteCommentById = exports.pushComment = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const pushComment = (comment) => {
    try {
        return pool_1.db.insert(schemas_1.comments).values(comment).execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de créer le commentaire " + err.message);
        throw new Error("Le commentaire ne peut pas être crée");
    }
};
exports.pushComment = pushComment;
const deleteCommentById = (id, userId) => {
    try {
        return pool_1.db.delete(schemas_1.comments).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.comments.id, id), (0, drizzle_orm_1.eq)(schemas_1.comments.authorId, userId)));
    }
    catch (err) {
        utils_1.logger.error("Impossible de supprimer le commentaire " + err.message);
        throw new Error("Le commentaire ne peut pas être supprimé");
    }
};
exports.deleteCommentById = deleteCommentById;
const findAllComments = () => {
    try {
        return pool_1.db.select({
            id: schemas_1.comments.id,
            content: schemas_1.comments.content,
            post: {
                id: schemas_1.posts.id,
                title: schemas_1.posts.title
            },
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username
            }
        }).from(schemas_1.comments)
            .leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.users.id, schemas_1.comments.authorId)).leftJoin(schemas_1.posts, (0, drizzle_orm_1.eq)(schemas_1.posts.id, schemas_1.comments.postId)).execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de récupérer les commentaires " + err.message);
        return [];
    }
};
exports.findAllComments = findAllComments;
const getCommentById = (id) => {
    try {
        return pool_1.db.select({
            id: schemas_1.comments.id,
            content: schemas_1.comments.content,
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username
            }
        }).from(schemas_1.comments)
            .leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.users.id, schemas_1.comments.authorId)).where((0, drizzle_orm_1.eq)(schemas_1.comments.id, id)).execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de récupérer le commentaire " + err.message);
        throw new Error("Le commentaire ne peut pas être recupéré");
    }
};
exports.getCommentById = getCommentById;
