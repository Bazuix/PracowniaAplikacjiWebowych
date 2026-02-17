import { Request, Response, NextFunction } from "express";
import { getDb } from "../mongo";

export const logger = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = getDb();

        const log = {
            method: req.method,
            url: req.originalUrl,
            date: new Date(),
            ip: req.ip
        };

        await db.collection("accessLogs").insertOne(log);
    } catch (err) {
        console.log("Mongo log error");
    }

    next();
};
