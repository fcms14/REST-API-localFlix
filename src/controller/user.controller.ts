import { Request, Response } from "express";
import log from "../utils/logger";
import { createUserService, deleteUserService, updateUserService, selectUserService, listUserService } from '../service/user.service';

export async function listUser(req: Request, res: Response) {
    const name = req.query.name?.toString();
    
    try {
        const users = await listUserService(name);

        if (!users || !users.length) {

            return res.status(404).send("Users not found");
        }

        return res.status(200).json({ users });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function selectUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    if (!userId) {

        return res.status(406).send("User ID can't be empty");
    }

    try {
        const user = await selectUserService(userId);
        if (!user) {

            return res.status(404).send("User not found");
        }

        return res.status(200).json({ user });
    } catch (e: any) {
        log.error(e.message);
        
        return res.status(400).send("Unhandled error");
    }
}

export async function createUser(req: Request, res: Response) {
    const name = req.body.name?.toString();

    if (!name) {

        return res.status(406).send("Name can't be empty");
    }

    try {
        const user = await createUserService(name);

        return res.status(201).json({ user });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const name = req.body.name?.toString();

    if (!userId) {

        return res.status(406).send("User ID can't be empty");
    }

    if (!name) {

        return res.status(406).send("Name can't be empty");
    }

    try {
        if (!await selectUserService(userId)) {

            return res.status(404).send("User not found");
        }

        const user = await updateUserService(userId, name);

        return res.status(200).json({ user });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    if (!userId) {

        return res.status(406).send("User ID can't be empty");
    }

    try {
        if (!await selectUserService(userId)) {

            return res.status(404).send("User not found");
        }

        const user = await deleteUserService(userId);

        return res.status(200).json({ user });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}
