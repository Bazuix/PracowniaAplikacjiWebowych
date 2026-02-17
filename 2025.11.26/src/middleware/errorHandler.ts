import { Request, Response, NextFunction } from "express";
import { getDb } from "../mongo";

export const errorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    try {
        const db = getDb();
        await db.collection("errorLogs").insertOne({
            message: err.message,
            stack: err.stack,
            date: new Date(),
            url: req.originalUrl
        });
    } catch {}

    res.status(500).json({
        error: "Server error",
        message: err.message
    });
};
