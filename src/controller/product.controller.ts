import { Request, Response } from "express";
import { prisma } from "../prisma";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { product } from '../service/product.service';

export const productController = (mock?: typeof prisma) => {
    const database = mock || prisma;
    const userService = user(database);
    const service = product(database);

    const list = async (req: Request, res: Response) => {
        const type = req.query.type?.toString();
        const title = req.query.title?.toString();
        const method = req.query.method?.toString();
    
        try {
            const products = await service.list(type, title, method);
    
            if (!products || !products.length) {
    
                return res.status(404).send("Products not found");
            }
    
            return res.status(200).json({ products });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const select = async (req: Request, res: Response) => {
        const productId = parseInt(req.params.productId);
    
        if (!productId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        try {
            const product = await service.select(productId);
            if (!product) {
    
                return res.status(404).send("Product not found");
            }
    
            return res.status(200).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const create = async (req: Request, res: Response) => {
        const usersId   = parseInt(req.body.usersId);
        const type      = req.body.type?.toString();
        const method    = req.body.method?.toString();
        const inventory = parseInt(req.body.inventory);
        const price     = Number(req.body.price);
        const title     = req.body.title?.toString();
    
        const allowedTypes   = process.env.ALLOWED_TYPES || ['books', 'movies', 'series'];
        const allowedMethods = process.env.ALLOWED_METHODS || ['renting', 'selling', 'both'];
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!type || !allowedTypes.includes(type)) {
    
            return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
        }
    
        if (!method || !allowedMethods.includes(method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedMethods}`);
        }
    
        if (isNaN(inventory) || inventory < 0) {
    
            return res.status(406).send(`Inventory should be greater than or equal to 0`);
        }
    
        if (isNaN(price) || price <= 0) {
    
            return res.status(406).send(`Price should be greater than 0`);
        }
    
        if (!title) {
    
            return res.status(406).send("Title can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
    
            const product = await service.create(usersId, type, title, method, inventory, price);
    
            return res.status(201).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const usersId   = parseInt(req.body.usersId);
        const productId = parseInt(req.params.productId);
        const type      = req.body.type?.toString();
        const title     = req.body.title?.toString();
        const method    = req.body.method?.toString();
        const inventory = parseInt(req.body.inventory);
        const price     = Number(req.body.price);
    
        const allowedTypes   = process.env.ALLOWED_TYPES || ['books', 'movies', 'series'];
        const allowedMethods = process.env.ALLOWED_METHODS || ['renting', 'selling', 'both'];
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!productId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!type || !allowedTypes.includes(type)) {
    
            return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
        }
    
        if (!method || !allowedMethods.includes(method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedMethods}`);
        }
    
        if (isNaN(inventory) || inventory < 0) {
    
            return res.status(406).send(`Inventory should be greater than or equal to 0`);
        }
    
        if (isNaN(price) || price <= 0) {
    
            return res.status(406).send(`Price should be greater than 0`);
        }
    
        if (!title) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
    
            if (!await service.select(productId)) {
    
                return res.status(404).send("Product not found");
            }
    
            const product = await service.update(productId, usersId, type, title, method, inventory, price);
    
            return res.status(200).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const productId = parseInt(req.params.productId);
        const usersId   = parseInt(req.body.usersId);
      
        if (!productId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await userService.select(usersId)) {
    
                return res.status(404).send("User not found");
            }
            
            if (!await service.select(productId)) {
    
                return res.status(404).send("Product not found");
            }
    
            const product = await service.remove(productId, usersId);
    
            return res.status(200).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };

    return { list, select, create, update, remove };
}
