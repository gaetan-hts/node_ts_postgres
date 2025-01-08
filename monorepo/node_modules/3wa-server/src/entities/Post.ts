import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { posts } from "../schemas";

// Un type pour le modèle d'un post au moment de la selection dans la DB
export type Post = InferSelectModel<typeof posts>;

// Un type pour le modèle d'un post au moment de son insertion dans la DB
export type NewPost = InferInsertModel<typeof posts>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table post
export type PostColumns = { [K in keyof Post]?: boolean };
