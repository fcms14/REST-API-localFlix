import { Request, Response } from "express";
import log from "../utils/logger";
import { user } from '../service/user.service';

export const userController = (mockService?: any) => {
    const service = user();

    const list = async (req: Request, res: Response) => {
        const {query: _user} = req;
        
        try {
            const users = await service.list(_user);
    
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
        const {params: _user} = req;
    
        if (!_user.userId || isNaN(parseInt(_user.userId))) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            const user = await service.select(_user);
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
        const {body: _user} = req;
    
        if (!_user.name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            const user = await service.create(_user);
    
            return res.status(201).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const {body, params} = req;
        const _user = {name: body.name, userId: parseInt(params.userId)};
    
        if (!_user.userId  || isNaN(_user.userId)) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!_user.name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!await service.select(_user)) {
    
                return res.status(404).send("User not found");
            }
    
            const user = await service.update(_user);
    
            return res.status(200).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const {params: _user} = req;
    
        if (!_user.userId || isNaN(parseInt(_user.userId))) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await service.select(_user)) {
    
                return res.status(404).send("User not found");
            }
    
            const user = await service.remove(_user);
    
            return res.status(200).json({ user });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };

    return { list, select, create, update, remove };
}
