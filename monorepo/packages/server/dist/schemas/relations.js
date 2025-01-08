"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRelation = exports.commentRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require("./");
exports.userRelations = (0, drizzle_orm_1.relations)(_1.users, ({ many }) => ({
    posts: many(_1.posts), // un utilisateur peut avoir plusieurs posts
    comments: many(_1.comments) // un utilisateur peut avoir plusieurs commentaires
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(_1.comments, ({ one }) => ({
    user: one(_1.users, {
        // premièrement, on recupere la colonne qui fait référence à users dans la table comments
        fields: [_1.comments.authorId],
        // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
        references: [_1.users.id]
    }),
    post: one(_1.posts, {
        // premièrement, on recupere la colonne qui fait référence à users dans la table comments
        fields: [_1.comments.postId],
        // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
        references: [_1.posts.id]
    })
}));
exports.postRelation = (0, drizzle_orm_1.relations)(_1.posts, ({ one, many }) => ({
    user: one(_1.users, {
        fields: [_1.posts.author],
        references: [_1.users.id]
    }),
    comments: many(_1.comments)
}));
