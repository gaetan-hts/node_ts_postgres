import { Request, Response } from "express";

import { findAllComments, pushComment, deleteCommentById, getCommentById } from "../models/comment.model";
import { APIResponse } from "../utils";

// Controller recup tout commentaires 
export const getAll = async (request: Request, response: Response) => {
    try {
        const comments = await findAllComments();
        APIResponse(response, comments, "All comments", 200);
    } catch (err: any) {
        console.error(err);
        APIResponse(response, [], err.message, 500);
    }
};

// Controller recup un commentaire en fonction de son id
export const findCommentById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const comment = await getCommentById(id)
    if (comment) {
        APIResponse(response, comment, "Comment found", 200);
    } else {
        APIResponse(response, null, "Comment not found", 404);
    }
};

// creation commentaire
export const createComment = async (request: Request, response: Response) => {
    const newComment = request.body;

    await pushComment(newComment);
    APIResponse(response, newComment, "Comment created", 201);
};

// suppression commentaire en fonction de son id
export const deleteCommentId = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deleteCommentById(id, userId);
    APIResponse(response, null, "Comment deleted", 204);
};