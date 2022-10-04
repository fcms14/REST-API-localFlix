import { Request } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import { customerController } from './customer.controller';

const mockService = () => {
    const list    = () => {};
    const select  = () => {};
    const create  = () => {};
    const update  = () => {};
    const remove  = () => {};

    return { list, select, create, update, remove };
};

const controller = customerController(mockService);

describe('selectCustomer', () => {
    it('should not be able to select a customer with empty customerId', async () => {
        const request  = createRequest({ method: 'GET', params: { customerId: '' } });
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to select a customer with customerId as a string', async () => {
        const request  = createRequest({ method: 'GET', params: { customerId: 'a' } });
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });
});

describe('createCustomer', () => {
    it('should not be able to create a customer with empty name', async () => {
        expect((await controller.create({body: {name: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a customer with empty usersId', async () => {
        expect((await controller.create({body: {name: 'a', usersId: ''}} as Request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a user with usersId as a string', async () => {
        expect((await controller.create({body: {name: 'a', usersId: 'a'}} as Request, createResponse())).statusCode).toBe(406);
    });
});

describe('updateCustomer', () => {
    it('should not be able to update a customer with empty customerId', async () => {
        const request  = createRequest({method: 'PUT', params: { customerId: ''} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a customer with customerId as a string', async () => {
        const request  = createRequest({method: 'PUT', params: { customerId: 'a'} });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a customer with empty usersId', async () => {
        const request  = createRequest({method: 'PUT', params: { customerId: 1,}, body: { usersId: '' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a customer with usersId as a string', async () => {
        const request  = createRequest({method: 'PUT', params: { customerId: 1,}, body: { usersId: 'a' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a customer with empty name', async () => {
        const request  = createRequest({method: 'PUT', params: { customerId: 1}, body: { usersId: 1, name: '' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });
});

describe('deleteCustomer', () => {
    it('should not be able to delete a customer with empty customerId', async () => {
        const request  = createRequest({method: 'DELETE', params: { customerId: ''} });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a customer with customerId as a string', async () => {
        const request  = createRequest({ method: 'DELETE', params: { customerId: 'a' } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a customer with empty usersId', async () => {
        const request  = createRequest({ method: 'DELETE', body: { usersId: '' }, params: { customerId: 1 } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a customer with usersId as a string', async () => {
        const request  = createRequest({ method: 'DELETE', body: { usersId: 'a' }, params: { customerId: 1 } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });
});