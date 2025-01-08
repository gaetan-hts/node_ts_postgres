import { Response } from "express";

export const APIResponse = (response: Response, data: any, message: string, status: number = 200) => {
    response.status(status).json({ data: data, message: message });
}