import { Request, Response } from "express";
import { prisma } from "../prisma";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { product } from '../service/product.service';
import { customer } from '../service/customer.service';
import { transaction } from '../service/productsLog.service';

export const transactionController = (mock?: typeof prisma) => {
    const database = mock || prisma;
    const userService = user(database);
    const productService = product(database);
    const customerService = customer(database);
    const service = transaction(database);

    const create = async (req: Request, res: Response) => {
        const productsId  = parseInt(req.body.productsId);
        const method      = req.body.method?.toString();
        const quantity    = parseInt(req.body.quantity);
        const returningAt = req.body.returningAt ? new Date(req.body.returningAt) : null;
        const customersId = parseInt(req.body.customersId);
        const usersId     = parseInt(req.body.usersId);
    
        const allowedTransactions = process.env.ALLOWED_TRANSACTIONS || ['renting', 'selling'];
    
        if (!productsId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!method || !allowedTransactions.includes(method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedTransactions}`);
        }
    
        if (isNaN(quantity) || quantity <= 0) {
    
            return res.status(406).send(`Quantity should be greater than 0`);
        }
    
        if (method === "renting" && !returningAt) {
        
            return res.status(406).send("Returning Date can't be empty");
        }
    
        if (method === "renting" && !customersId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {
            const product = await productService.select(productsId);
            if (!product) {
    
                return res.status(404).send("Product not found");
            }
    
            if (product.method !== "both" && product.method !== method) {
    
                return res.status(406).send(`Method not allowed. The selected product is only available for ${product.method}`);
            }
    
            if (quantity > product.inventory) {
    
                return res.status(406).send(`Unavailable quantity. ${product.inventory} is available`);
            }
    
            const customer = customersId ? await customerService.select(customersId) : null;
            if (customersId && !customer) {
    
                return res.status(404).send("Customer not found");
            }
    
            const user = usersId ? await userService.select(usersId) : null;
            if (usersId && !user) {
    
                return res.status(404).send("User not found");
            }
    
            const returningRentinAt = method === 'renting' ? returningAt : null;
            const transaction = await service.create(product.id, quantity, product.price, user?.id, customer?.id, returningRentinAt);        
            
            if (transaction) {
                await productService.updateProductInventory(product.id, product.inventory - quantity, user?.id);            
            }
    
            return res.status(201).json({ transaction });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const returning = async (req: Request, res: Response) => {
        const productsId  = parseInt(req.body.productsId);
        const customersId = parseInt(req.body.customersId);
        const usersId     = parseInt(req.body.usersId);
    
        if (!productsId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!customersId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {
            const product = await productService.select(productsId);
            if (!product) {
    
                return res.status(404).send("Product not found");
            }
    
            const customer = await customerService.select(customersId);
            if (!customer) {
    
                return res.status(404).send("Customer not found");
            }
    
            const user = usersId ? await userService.select(usersId) : null;
            if (usersId && !user) {
    
                return res.status(404).send("User not found");
            }
    
            const transaction = await service.returning(product.id, customer.id, user?.id);
    
            if (!transaction) {
    
                return res.status(404).send("Transation not found");
            }
    
            await productService.updateProductInventory(product.id, product.inventory + transaction.quantity, user?.id);
    
            return res.status(200).json({ transaction });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const list = async (req: Request, res: Response) => {
        const pendingReturn = req.query.pendingReturn?.toString();
        const startAt       = req.query.startDate?.toString();
        const endAt         = req.query.endDate?.toString();
        const method        = req.query.method?.toString();
        const {query: customer} = req;
        const type          = req.query.type?.toString();
        const title         = req.query.title?.toString();
    
        const allowedTransactions = process.env.ALLOWED_TRANSACTIONS || ['renting', 'selling'];
    
        if (method && !allowedTransactions.includes(method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedTransactions}`);
        }
    
        try {
            const customers = customer ? await customerService.list(customer) : [];
            const products  = type || title ? await productService.list(type, title) : [];
    
            if (customer && (!customers || !customers.length)) {
    
                return res.status(404).send("Costumers not found");
            }
    
            if ((type || title) && (!products || !products.length)) {
    
                return res.status(404).send("Products not found");
            }
    
            const customersIds = customers.map(customer => customer.id);
            const productsIds  = products.map(product => product.id);
    
            const productsLog = await service.list(pendingReturn, startAt, endAt, method, customersIds, productsIds);
    
            if (!productsLog || !productsLog.length) {
    
                return res.status(404).send("Products Logs not found");
            }
    
            return res.status(200).json({ productsLog });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };

    return { create, returning, list};
}
