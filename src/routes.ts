import express from 'express';

import { userController } from './controller/user.controller';
import { customerController } from './controller/customer.controller';
import { productController } from './controller/product.controller';
import { transactionController } from './controller/productsLog.controller';
import { ensureCompanyAuthenticated } from "./middleware/company.middleware";
import { ensureCustomerAuthenticated } from "./middleware/customer.middleware";

export const routes = express.Router();

const user = userController();
const customer = customerController();
const product = productController();
const transaction = transactionController();

routes.get("/api/user", ensureCompanyAuthenticated, user.list);
routes.post("/api/user", user.create);
routes.get("/api/user/:userId", ensureCompanyAuthenticated, user.select);
routes.put("/api/user/:userId", ensureCompanyAuthenticated, user.update);
routes.delete("/api/user/:userId", ensureCompanyAuthenticated, user.remove);

routes.get("/api/customer", ensureCompanyAuthenticated, customer.list);
routes.post("/api/customer", customer.create);
routes.get("/api/customer/:customerId", ensureCompanyAuthenticated, customer.select);
routes.put("/api/customer/:customerId", ensureCompanyAuthenticated, customer.update);
routes.delete("/api/customer/:customerId", ensureCompanyAuthenticated, customer.remove);

routes.get("/api/product", product.list);
routes.post("/api/product", ensureCompanyAuthenticated, product.create);
routes.get("/api/product/:productId", product.select);
routes.put("/api/product/:productId", ensureCompanyAuthenticated, product.update);
routes.delete("/api/product/:productId", ensureCompanyAuthenticated, product.remove);

routes.get("/api/transactions", ensureCompanyAuthenticated, transaction.list);
routes.post("/api/transactions", ensureCompanyAuthenticated, transaction.create);
routes.put("/api/transactions", ensureCompanyAuthenticated, transaction.returning);

routes.post("/public/api/customer", customer.create);
routes.get("/public/api/customer/:customerId", ensureCustomerAuthenticated, customer.select);
routes.put("/public/api/customer/:customerId", ensureCustomerAuthenticated, customer.update);
routes.delete("/public/api/customer/:customerId", ensureCustomerAuthenticated, customer.remove);

routes.get("/public/api/product", product.list);
routes.get("/public/api/product/:productId", product.select);

routes.post("/public/api/transactions", ensureCustomerAuthenticated, transaction.create);
routes.put("/public/api/transactions", ensureCustomerAuthenticated, transaction.returning);