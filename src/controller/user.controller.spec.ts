import { Request } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import { userController } from './user.controller';

const controller = userController();

describe('selectUser', () => {
    it('should not be able to select a user with empty userId', async () => {
        const request  = createRequest({ method: 'GET', params: { userId: '' }    });
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to select a user with userId as a string', async () => {
        const request  = createRequest({ method: 'GET', params: { userId: 'a' } });
        expect((await controller.select(request, createResponse())).statusCode).toBe(406);
    });
});

describe('createUser', () => {
    it('should not be able to create a user with empty name', async () => {
        expect((await controller.create({body: { name: ''}} as Request, createResponse())).statusCode).toBe(406);
    });
});

describe('updateUser', () => {
    it('should not be able to update a user with empty userId', async () => {
        const request  = createRequest({ method: 'PUT', params: { userId: '' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a user with userId as a string', async () => {
        const request  = createRequest({ method: 'PUT', params: { userId: 'a' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to update a user with empty name', async () => {
        const request  = createRequest({ method: 'PUT', params: { userId: 1 }, body: { name: '' } });
        expect((await controller.update(request, createResponse())).statusCode).toBe(406);
    });
});

describe('deleteUser', () => {
    it('should not be able to delete a user with empty userId', async () => {
        const request  = createRequest({ method: 'DELETE', params: { userId: '' } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to delete a user with userId as a string', async () => {
        const request  = createRequest({ method: 'DELETE', params: { userId: 'a' } });
        expect((await controller.remove(request, createResponse())).statusCode).toBe(406);
    });
});