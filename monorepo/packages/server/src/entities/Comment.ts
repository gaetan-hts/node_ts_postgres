import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { comments } from "../schemas";

// Un type pour le modèle d'un Comment au moment de la selection dans la DB
export type Comment = InferSelectModel<typeof comments>;

// Un type pour le modèle d'un Comment au moment de son insertion dans la DB
export type NewComment = InferInsertModel<typeof comments>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table Comment
export type CommentColumns = { [K in keyof Comment]?: boolean };
