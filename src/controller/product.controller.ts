import { Request, Response } from "express";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { product } from '../service/product.service';

export const productController = (mockService?: any) => {
    const userService = user();
    const service = product();

    const list = async (req: Request, res: Response) => {
        const {query: _product} = req;
    
        try {
            const products = await service.list(_product);
    
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
        const {params: _product} = req;
    
        if (!_product.productId || isNaN(parseInt(_product.productId))) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        try {
            const product = await service.select(_product);
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
        const {body: _product} = req;
    
        const allowedTypes   = process.env.ALLOWED_TYPES || ['books', 'movies', 'series'];
        const allowedMethods = process.env.ALLOWED_METHODS || ['renting', 'selling', 'both'];
    
        if (!_product.usersId || isNaN(parseInt(_product.usersId))) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!_product.type || !allowedTypes.includes(_product.type)) {
    
            return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
        }
    
        if (!_product.method || !allowedMethods.includes(_product.method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedMethods}`);
        }
    
        if (isNaN(parseInt(_product.inventory)) || parseInt(_product.inventory) < 0) {
    
            return res.status(406).send(`Inventory should be greater than or equal to 0`);
        }
    
        if (isNaN(parseInt(_product.price)) || parseInt(_product.price) <= 0) {
    
            return res.status(406).send(`Price should be greater than 0`);
        }
    
        if (!_product.title) {
    
            return res.status(406).send("Title can't be empty");
        }
    
        try {
            if (!await userService.select(_product)) {
    
                return res.status(404).send("User not found");
            }
    
            const product = await service.create(_product);
    
            return res.status(201).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const update = async (req: Request, res: Response) => {
        const {body, params} = req;
        const _product = {usersId: parseInt(body.usersId), productId: parseInt(params.productId), type: body.type, title: body.title, method: body.method, inventory: parseInt(body.inventory), price: Number(body.price)};
    
        const allowedTypes   = process.env.ALLOWED_TYPES || ['books', 'movies', 'series'];
        const allowedMethods = process.env.ALLOWED_METHODS || ['renting', 'selling', 'both'];
    
        if (!_product.usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        if (!_product.productId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!_product.type || !allowedTypes.includes(_product.type)) {
    
            return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
        }
    
        if (!_product.method || !allowedMethods.includes(_product.method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedMethods}`);
        }
    
        if (isNaN(_product.inventory) || _product.inventory < 0) {
    
            return res.status(406).send(`Inventory should be greater than or equal to 0`);
        }
    
        if (isNaN(_product.price) || _product.price <= 0) {
    
            return res.status(406).send(`Price should be greater than 0`);
        }
    
        if (!_product.title) {
    
            return res.status(406).send("Name can't be empty");
        }
    
        try {
            if (!await userService.select(_product)) {
    
                return res.status(404).send("User not found");
            }
    
            if (!await service.select(_product)) {
    
                return res.status(404).send("Product not found");
            }
    
            const product = await service.update(_product);
    
            return res.status(200).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const remove = async (req: Request, res: Response) => {
        const {body, params} = req;
        const _product = {productId: parseInt(params.productId), usersId: parseInt(body.usersId)};
      
        if (!_product.productId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!_product.usersId) {
    
            return res.status(406).send("User ID can't be empty");
        }
    
        try {
            if (!await userService.select(_product)) {
    
                return res.status(404).send("User not found");
            }
            
            if (!await service.select(_product)) {
    
                return res.status(404).send("Product not found");
            }
    
            const product = await service.remove(_product);
    
            return res.status(200).json({ product });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };

    return { list, select, create, update, remove };
}
