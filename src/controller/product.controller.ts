import { Request, Response } from "express";
import log from "../utils/logger";
import { selectUserService } from '../service/user.service';
import { createProductService, deleteProductService, updateProductService, selectProductService, listProductService } from '../service/product.service';

export async function listProduct(req: Request, res: Response) {
    const type = req.query.type?.toString();
    const title = req.query.title?.toString();
    const method = req.query.method?.toString();

    try {
        const products = await listProductService(type, title, method);

        if (!products || !products.length) {

            return res.status(404).send("Products not found");
        }

        return res.status(200).json({ products });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function selectProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);

    if (!productId) {

        return res.status(406).send("Product ID can't be empty");
    }

    try {
        const product = await selectProductService(productId);
        if (!product) {

            return res.status(404).send("Product not found");
        }

        return res.status(200).json({ product });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function createProduct(req: Request, res: Response) {
    const type      = req.body.type.toString();
    const title     = req.body.title.toString();
    const method    = req.body.method.toString();
    const inventory = parseInt(req.body.inventory);
    const price     = Number(req.body.price.toFixed(2));
    const usersId   = parseInt(req.body.usersId);

    const allowedTypes   = process.env.ALLOWED_TYPES || [''];
    const allowedMethods = process.env.ALLOWED_METHODS || [''];

    if (!usersId) {

        return res.status(406).send("User ID can't be empty");
    }

    if (!allowedTypes.includes(type)) {

        return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
    }

    if (!allowedMethods.includes(method)) {

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
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }

        const product = await createProductService(usersId, type, title, method, inventory, price);

        return res.status(201).json({ product });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);
    const type      = req.body.type.toString();
    const title     = req.body.title.toString();
    const method    = req.body.method.toString();
    const inventory = parseInt(req.body.inventory);
    const price     = Number(req.body.price.toFixed(2));
    const usersId   = parseInt(req.body.usersId);

    const allowedTypes   = process.env.ALLOWED_TYPES || [''];
    const allowedMethods = process.env.ALLOWED_METHODS || [''];

    if (!usersId) {

        return res.status(406).send("User ID can't be empty");
    }

    if (!productId) {

        return res.status(406).send("Product ID can't be empty");
    }

    if (!allowedTypes.includes(type)) {

        return res.status(406).send(`Only the following types are allowed: ${allowedTypes}`);
    }

    if (!allowedMethods.includes(method)) {

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
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }

        if (!await selectProductService(productId)) {

            return res.status(404).send("Product not found");
        }

        const product = await updateProductService(productId, usersId, type, title, method, inventory, price);

        return res.status(200).json({ product });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);
    const usersId   = parseInt(req.body.usersId);

    if (!usersId) {

        return res.status(406).send("User ID can't be empty");
    }
    
    if (!productId) {

        return res.status(406).send("Product ID can't be empty");
    }

    try {
        if (!await selectUserService(usersId)) {

            return res.status(404).send("User not found");
        }
        
        if (!await selectProductService(productId)) {

            return res.status(404).send("Product not found");
        }

        const product = await deleteProductService(productId, usersId);

        return res.status(200).json({ product });
    } catch (e: any) {
        log.error(e.message);

        return res.status(400).send("Unhandled error");
    }
}
