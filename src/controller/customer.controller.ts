import { Request, Response } from "express";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { customer } from '../service/customer.service';

export const customerController = (mockService?: any) => {
    const userService =  mockService || user();
    const service     =  mockService || customer();
    
    const list = async (req: Request, res: Response) => {
        const {query: _customer} = req;
        
        try {
            const customers = await service.list(_customer);
    
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
        const {params: _customer} = req;

        if (!_customer.customerId || isNaN(parseInt(_customer.customerId))) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {

            const customer = await service.select(_customer);
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
        const {body: _customer} = req;
    
        if (!_customer.name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        if (_customer.usersId && isNaN(parseInt(_customer.usersId))) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!!_customer.usersId && !await userService.select(_customer)) {
    
                return res.status(404).send("User not found");
            }
    
            const customer = await service.create(_customer);
    
            return res.status(201).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const {body, params} = req;
        const _customer = {name: body.name, usersId: parseInt(body.usersId), customerId: parseInt(params.customerId)};
    
        if (!_customer.customerId || isNaN(_customer.customerId)) {
    
            return res.status(406).send("Customer ID can't be empty");
        }

        if (_customer.usersId && isNaN(_customer.usersId)) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!_customer.name) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!!_customer.usersId && !await userService.select(_customer)) {
    
                return res.status(404).send("User not found");
            }
    
            if (!await service.select(_customer)) {
    
                return res.status(404).send("Customer not found");
            }
    
            const customer = await service.update(_customer);
    
            return res.status(200).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const {body, params} = req;
        const _customer = {customerId: parseInt(params.customerId), usersId: parseInt(body.usersId)};
    
        if (!_customer.customerId || isNaN(_customer.customerId)) {
    
            return res.status(406).send("Customer ID can't be empty");
        }

        if (_customer.usersId && isNaN(_customer.usersId)) {

            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!!_customer.usersId && !await userService.select(_customer)) {
    
                return res.status(404).send("User not found");
            }
            
            if (!await service.select(_customer)) {
    
                return res.status(404).send("Customer not found");
            }
    
            const customer = await service.remove(_customer);
    
            return res.status(200).json({ customer });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    return { list, select, create, update, remove };
}
