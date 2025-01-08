import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users } from "../schemas";

// Un type pour le modèle d'un user au moment de la selection dans la DB
export type User = InferSelectModel<typeof users>;

// Un type pour le modèle d'un user au moment de son insertion dans la DB
export type NewUser = InferInsertModel<typeof users>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table user
export type UserColumns = { [K in keyof User]?: boolean };
