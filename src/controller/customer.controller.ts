import { Request, Response } from "express";
import log from "../utils/logger";
import { selectUserService } from '../service/user.service';
import { createCustomerService, deleteCustomerService, updateCustomerService, selectCustomerService, listCustomerService } from '../service/customer.service';

export async function listCustomer(req: Request, res: Response) {
    const name = req.query.name?.toString();
    
    try {
        const customers = await listCustomerService(name);

        if (!customers || !customers.length) {

            return res.status(404).send("Users not found");
        }

        return res.status(200).json({ customers });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function selectCustomer(req: Request, res: Response) {
    const customerId = parseInt(req.params.customerId);

    if (!customerId) {

        return res.status(406).send("Customer ID can't be empty");
    }

    try {
        const customer = await selectCustomerService(customerId);
        if (!customer) {

            return res.status(404).send("Customer not found");
        }

        return res.status(200).json({ customer });
    } catch (e: any) {
        log.error(e.message);
        
        return res.status(400).send("Unhandled error");
    }
}

export async function createCustomer(req: Request, res: Response) {
    const name    = req.body.name?.toString();
    const usersId = parseInt(req.body.usersId);

    if (!name) {

        return res.status(406).send("Name can't be empty");
    }

    if (!usersId) {

        return res.status(406).send("User ID can't be empty");
    }

    try {
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }

        const customer = await createCustomerService(name, usersId);

        return res.status(201).json({ customer });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function updateCustomer(req: Request, res: Response) {
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
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }

        if (!await selectCustomerService(customerId)) {

            return res.status(404).send("Customer not found");
        }

        const customer = await updateCustomerService(customerId, name, usersId);

        return res.status(200).json({ customer });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function deleteCustomer(req: Request, res: Response) {
    const customerId = parseInt(req.params.customerId);
    const usersId = parseInt(req.body.usersId);

    if (!customerId) {

        return res.status(406).send("Customer ID can't be empty");
    }

    if (!usersId) {

        return res.status(406).send("User ID can't be empty");
    }

    try {
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }
        
        if (!await selectCustomerService(customerId)) {

            return res.status(404).send("Customer not found");
        }

        const customer = await deleteCustomerService(customerId, usersId);

        return res.status(200).json({ customer });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}
