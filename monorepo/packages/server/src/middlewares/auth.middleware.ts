import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


import { env } from "../config/env";
import { APIResponse } from "../utils";

const { JWT_SECRET } = env;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return APIResponse(res, null, 'Vous devez être connecté', 401);

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        res.locals.user = decoded;
        next();
    } catch (err) {
        return APIResponse(res, null, 'Token invalide', 401)
    }
}