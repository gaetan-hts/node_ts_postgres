import { Request, Response } from "express";

import { deletePost, findAllPost, findPostById, pushPost, updatePost } from "../models/post.model";
import { APIResponse } from "../utils";

export const getAllPosts = async (request: Request, response: Response) => {
    const posts = await findAllPost();
    APIResponse(response, posts, "All posts", 200);
}

export const getPostById = async (request: Request, response: Response) => {
    // parseInt() pour convertir une chaîne de caractères en nombre (les paramètres sont des chaines de caractères)
    const { id } = request.params;

    const post = await findPostById(id);
    if (post) {
        APIResponse(response, post, "Post found", 200);
    } else {
        APIResponse(response, null, "Post not found", 404);
    }
}

export const createPost = async (request: Request, response: Response) => {
    const newPost = request.body;

    await pushPost(newPost);
    APIResponse(response, newPost, "Post created", 201);
}

export const deletePostById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { userId } = response.locals.user;

    await deletePost(id, userId);
    APIResponse(response, null, "Post deleted", 204);
}

export const updatePostById = async (request: Request, response: Response) => {
    // On converti le paramètre en nombre (car il est en chaine de caractère nativement)
    const { id } = request.params;
    const { post } = request.body;

    await updatePost(id, post);
    APIResponse(response, post, "Post updated", 200);
}