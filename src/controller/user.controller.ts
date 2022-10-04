import { Request, Response } from "express";
import { prisma } from "../prisma";
import log from "../utils/logger";
import { user } from '../service/user.service';

export const userController = (mock?: typeof prisma) => {
    const database = mock || prisma;
    const service = user(database);

    const list = async (req: Request, res: Response) => {
        const name = req.query.name?.toString();
        
        try {
            const users = await service.list(name);
    
            if (!users || !users.length) {
    
                return res.status(404).send("Users not found");
            }
    
            return res.status(200).json({ users });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const select = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
    
        if (!userId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            const user = await service.select(userId);
            if (!user) {
    
                return res.status(404).send("User not found");
            }
    
            return res.status(200).json({ user });
        } catch (e: any) {
            log.error(e.message);
            
            return res.status(400).send("Unhandled error");
        }
    };
    
    const create = async (req: Request, res: Response) => {
        const name = req.body.name?.toString();
    
        if (!name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            const user = await service.create(name);
    
            return res.status(201).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
        const name = req.body.name?.toString();
    
        if (!userId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!await service.select(userId)) {
    
                return res.status(404).send("User not found");
            }
    
            const user = await service.update(userId, name);
    
            return res.status(200).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const userId = parseInt(req.params.userId);
    
        if (!userId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await service.select(userId)) {
    
                return res.status(404).send("User not found");
            }
    
            const user = await service.remove(userId);
    
            return res.status(200).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };

    return { list, select, create, update, remove };
}
