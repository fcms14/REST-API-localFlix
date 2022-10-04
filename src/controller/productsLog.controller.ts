import { Request, Response } from "express";
import log from "../utils/logger";
import { user } from '../service/user.service';
import { product } from '../service/product.service';
import { customer } from '../service/customer.service';
import { transaction } from '../service/productsLog.service';

export const transactionController = () => {
    const userService = user();
    const productService = product();
    const customerService = customer();
    const service = transaction();

    const create = async (req: Request, res: Response) => {
        const {body: _transaction} = req;
        const _customer = {customerId: parseInt(_transaction.customersId)};
    
        const allowedTransactions = process.env.ALLOWED_TRANSACTIONS || ['renting', 'selling'];
    
        if (!_transaction.productsId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!_transaction.method || !allowedTransactions.includes(_transaction.method)) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedTransactions}`);
        }
    
        if (isNaN(_transaction.quantity) || _transaction.quantity <= 0) {
    
            return res.status(406).send(`Quantity should be greater than 0`);
        }
    
        if (_transaction.method === "renting" && !_transaction.returningAt) {
        
            return res.status(406).send("Returning Date can't be empty");
        }
    
        if (_transaction.method === "renting" && !_customer.customerId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {
            const product = await productService.select(_transaction);
            if (!product) {
    
                return res.status(404).send("Product not found");
            }
    
            if (product.method !== "both" && product.method !== _transaction.method) {
    
                return res.status(406).send(`Method not allowed. The selected product is only available for ${product.method}`);
            }
    
            if (_transaction.quantity > product.inventory) {
    
                return res.status(406).send(`Unavailable quantity. ${product.inventory} is available`);
            }
    
            const customer = _customer.customerId ? await customerService.select(_customer) : null;
            if (_customer.customerId && !customer) {
    
                return res.status(404).send("Customer not found");
            }
    
            const user = _transaction.usersId ? await userService.select(_transaction) : null;
            if (_transaction.usersId && !user) {
    
                return res.status(404).send("User not found");
            }
    
            const returningDate = _transaction.returningAt ? new Date(_transaction.returningAt) : null;
            const returningRentinAt = _transaction.method === 'renting' ? returningDate : null;
            const transaction = await service.create({productsId: product.id, quantity: _transaction.quantity, price: product.price, usersId: user?.id, customersId: customer?.id, returningAt: returningRentinAt});
            
            if (transaction) {
                await productService.updateProductInventory({productId: product.id, inventory: product.inventory - transaction.quantity, usersId: user?.id});
            }
    
            return res.status(201).json({ transaction });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const returning = async (req: Request, res: Response) => {
        const {body: _transaction} = req;
        const _customer = {customerId: parseInt(_transaction.customersId)};
    
        if (!_transaction.productsId) {
    
            return res.status(406).send("Product ID can't be empty");
        }
    
        if (!_customer.customerId) {
    
            return res.status(406).send("Customer ID can't be empty");
        }
    
        try {
            const product = await productService.select(_transaction);
            if (!product) {
    
                return res.status(404).send("Product not found");
            }
    
            const customer = await customerService.select(_customer);
            if (!customer) {
    
                return res.status(404).send("Customer not found");
            }
    
            const user = _transaction.usersId ? await userService.select(_transaction) : null;
            if (_transaction.usersId && !user) {
    
                return res.status(404).send("User not found");
            }
    
            const transaction = await service.returning(_transaction);
    
            if (!transaction) {
    
                return res.status(404).send("Transation not found");
            }
    
            await productService.updateProductInventory({productId: product.id, inventory: product.inventory + transaction.quantity, usersId: user?.id});
    
            return res.status(200).json({ transaction });
        } catch (e: any) {
            log.error(e.message);
    
            return res.status(400).send("Unhandled error");
        }
    };
    
    const list = async (req: Request, res: Response) => {
        let {query: _transaction} = req;
    
        const allowedTransactions = process.env.ALLOWED_TRANSACTIONS || ['renting', 'selling'];
    
        if (_transaction.method && !allowedTransactions.includes(_transaction.method.toString())) {
    
            return res.status(406).send(`Only the following methods are allowed: ${allowedTransactions}`);
        }
    
        try {
            const customers = _transaction.customerName ? await customerService.list(_transaction) : [];
            const products  = _transaction.type || _transaction.title ? await productService.list(_transaction) : [];
    
            if (_transaction.customer && (!customers || !customers.length)) {
    
                return res.status(404).send("Costumers not found");
            }
    
            if ((_transaction.type || _transaction.title) && (!products || !products.length)) {
    
                return res.status(404).send("Products not found");
            }
    
            const customersIds = customers.map(customer => customer.id);
            const productsIds  = products.map(product => product.id);
            
            const productsLog = await service.list(_transaction, customersIds, productsIds);
    
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
