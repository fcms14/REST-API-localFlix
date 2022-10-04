import { Request, Response } from "express";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { customer } from '../service/customer.service';

export const customerController = (mock?:{}) => {
    const userService = user();
    const service = customer();
    
    const list = async (req: Request, res: Response) => {
        const {query: customer} = req;
        
        try {
            const customers = await service.list(customer);
    
            if (!customers || !customers.length) {
    
                return res.status(404).send("Users not found");
            }
    
            return res.status(200).json({ customers });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const select = async (req: Request, res: Response) => {
        const customerId = parseInt(req.params.customerId);
    
        if (!customerId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {
            const customer = await service.select(customerId);
            if (!customer) {
    
                return res.status(404).send("Customer not found");
            }
    
            return res.status(200).json({ customer });
        } catch (e: any) {
            log.error(e.message);
            
            return res.status(400).send("Unhandled error");
        }
    };
    
    const create = async (req: Request, res: Response) => {
        const name    = req.body.name?.toString();
        const usersId = parseInt(req.body.usersId);
    
        if (!name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
    
            const customer = await service.create(name, usersId);
    
            return res.status(201).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const customerId = parseInt(req.params.customerId);
        const usersId = parseInt(req.body.usersId);
        const name = req.body.name?.toString();
    
        if (!customerId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
    
            if (!await service.select(customerId)) {
    
                return res.status(404).send("Customer not found");
            }
    
            const customer = await service.update(customerId, name, usersId);
    
            return res.status(200).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const customerId = parseInt(req.params.customerId);
        const usersId = parseInt(req.body.usersId);
    
        if (!customerId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
            
            if (!await service.select(customerId)) {
    
                return res.status(404).send("Customer not found");
            }
    
            const customer = await service.remove(customerId, usersId);
    
            return res.status(200).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    return { list, select, create, update, remove };
}
