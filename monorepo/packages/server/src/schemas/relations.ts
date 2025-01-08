import { relations } from "drizzle-orm";
import { users, comments, posts } from "./";

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts), // un utilisateur peut avoir plusieurs posts
    comments: many(comments) // un utilisateur peut avoir plusieurs commentaires
}));

export const commentRelations = relations(comments, ({ one }) =>  ({
    user: one(users, { // le nom de la table est référencée ici, un commentaire est lié à un seul utilisateur
        // premièrement, on recupere la colonne qui fait référence à users dans la table comments
        fields: [comments.authorId],
        // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
        references: [users.id]
    }),
    
    post: one(posts, { // le nom de la table est référencée ici, un commentaire est lié à un seul utilisateur
        // premièrement, on recupere la colonne qui fait référence à users dans la table comments
        fields: [comments.postId],
        // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
        references: [posts.id]
    })
}));

export const postRelation = relations(posts, ({ one, many }) => ({
    user: one(users, {
        fields: [posts.author],
        references: [users.id]
    }),
    comments: many(comments)
}))