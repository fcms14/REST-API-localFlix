import { NextFunction, Request, Response } from "express";

export async function ensureCustomerAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {

        return res.status(401).send("Unauthorized");
    }

    const [, user] = token.split(" ");

    if (user === "customer") {

        return next();
    }
    
    return res.status(401).send("Unauthorized");
}