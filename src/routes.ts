import express from 'express';
import { createUser, deleteUser, updateUser, selectUser, listUser } from './controller/user.controller';
import { createCustomer, deleteCustomer, updateCustomer, selectCustomer, listCustomer } from './controller/customer.controller';
import { createProduct, deleteProduct, updateProduct, selectProduct, listProduct } from './controller/product.controller';
import { createProductsLog, returningProductsLog, listProductsLog } from './controller/productsLog.controller';
import { ensureCompanyAuthenticated } from "./middleware/company.middleware";
import { ensureCustomerAuthenticated } from "./middleware/customer.middleware";

export const routes = express.Router();

routes.get("/api/user", ensureCompanyAuthenticated, listUser);
routes.post("/api/user", createUser);
routes.get("/api/user/:userId", ensureCompanyAuthenticated, selectUser);
routes.put("/api/user/:userId", ensureCompanyAuthenticated, updateUser);
routes.delete("/api/user/:userId", ensureCompanyAuthenticated, deleteUser);

routes.get("/api/customer", ensureCompanyAuthenticated, listCustomer);
routes.post("/api/customer", createCustomer);
routes.get("/api/customer/:customerId", ensureCompanyAuthenticated, selectCustomer);
routes.put("/api/customer/:customerId", ensureCompanyAuthenticated, updateCustomer);
routes.delete("/api/customer/:customerId", ensureCompanyAuthenticated, deleteCustomer);

routes.get("/api/product", listProduct);
routes.post("/api/product", ensureCompanyAuthenticated, createProduct);
routes.get("/api/product/:productId", selectProduct);
routes.put("/api/product/:productId", ensureCompanyAuthenticated, updateProduct);
routes.delete("/api/product/:productId", ensureCompanyAuthenticated, deleteProduct);

routes.get("/api/transactions", ensureCompanyAuthenticated, listProductsLog);
routes.post("/api/transactions", ensureCompanyAuthenticated, createProductsLog);
routes.put("/api/transactions", ensureCompanyAuthenticated, returningProductsLog);

routes.post("/public/api/customer", createCustomer);
routes.get("/public/api/customer/:customerId", ensureCustomerAuthenticated, selectCustomer);
routes.put("/public/api/customer/:customerId", ensureCustomerAuthenticated, updateCustomer);
routes.delete("/public/api/customer/:customerId", ensureCustomerAuthenticated, deleteCustomer);

routes.get("/public/api/product", listProduct);
routes.get("/public/api/product/:productId", selectProduct);

routes.post("/public/api/transactions", ensureCustomerAuthenticated, createProductsLog);
routes.put("/public/api/transactions", ensureCustomerAuthenticated, returningProductsLog);