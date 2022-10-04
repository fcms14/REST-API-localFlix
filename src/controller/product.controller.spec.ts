import { Request } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import { productController } from './product.controller';

const controller = productController();

describe('selectProduct', () => {
    it('should not be able to select a product with empty productId', async () => {
        const request  = createRequest({ method: 'GET', params: { productId: '' }});
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to select a product with productId as a string', async () => {
        const request  = createRequest({ method: 'GET', params: { productId: 'a'}});
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });
});

describe('createProduct', () => {
    it('should not be able to create a product with empty usersId', async () => {
        expect((await controller.create({body: {usersId: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with usersId as a string', async () => {
        expect((await controller.create({body: {usersId: 'a'}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with empty type', async () => {
        expect((await controller.create({body: {usersId: '1', type: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with type not allowed', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'cars'}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with empty method', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with method not allowed', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'change'}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with empty inventory', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with inventory as a string', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: 'a'}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with inventory less than zero', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: -1}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with empty price', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: 0, price: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with price as a string', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: 0, price: 'a'}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with price less than or equal to zero', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: 0, price: 0}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a product with empty title', async () => {
        expect((await controller.create({body: {usersId: '1', type: 'books', method: 'renting', inventory: 0, price: 1, title: ''}} as Request, createResponse())).statusCode).toBe(406);
    });
});

describe('updateProduct', () => {
    it('should not be able to update a product with empty usersId', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: '' }, params: {  } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with usersId as a string', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 'a' }, params: {  } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty productId', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1 }, params: { productId: ''} });
        expect((await controller.update( request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a user with productId as a string', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1 }, params: { productId: 'a' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty type', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: '' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with type not allowed', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'teste' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty method', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: '' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with method not allowed', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'teste' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty inventory', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: '' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with inventory as a string', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: 'a' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with inventory less than zero', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: '-1' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty price', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: 1, price: '' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with price as a string', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: 1, price: 'a' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with price less than or equal to zero', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: 1, price: 0 }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a product with empty title', async () => {
        const request  = createRequest({method: 'PUT', body: { usersId: 1, type: 'books', method: 'renting', inventory: 1, price: 1, title: '' }, params: { productId: 1} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });
});

describe('deleteProduct', () => {
    it('should not be able to delete a product with empty productId', async () => {
        const request  = createRequest({method: 'DELETE', params: { productId: ''} });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a product with productId as a string', async () => {
        const request  = createRequest({ method: 'DELETE', params: { productId: 'a' } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a product with empty usersId', async () => {
        const request  = createRequest({ method: 'DELETE', body: { usersId: '' }, params: { productId: 1 } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a product with usersId as a string', async () => {
        const request  = createRequest({ method: 'DELETE', body: { usersId: 'a' }, params: { productId: 1 } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });
});