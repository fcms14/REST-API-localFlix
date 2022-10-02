import { Request } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import { createCustomer, selectCustomer, updateCustomer, deleteCustomer } from './customer.controller';

describe('selectCustomer', () => {
    let request  = createRequest({
        method: 'GET',
        params: {
            customerId: ''
        }
    });

    it('should not be able to select a customer with empty customerId', async () => {
        const customer = await selectCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'GET',
        params: {
            customerId: 'a'
        }
    });

    it('should not be able to create a customer with customerId as a string', async () => {
        const customer = await selectCustomer(request, createResponse());

        expect(customer.status(406));
    });
});

describe('createCustomer', () => {
    it('should not be able to create a customer with empty name', async () => {
        const customer = await createCustomer({
            body: {
                name: ''
            },
        } as Request, createResponse());

        expect(customer.status(406));
    });

    it('should not be able to create a customer with empty usersId', async () => {
        const customer = await createCustomer({
            body: {
                usersId: ''
            },
        } as Request, createResponse());

        expect(customer.status(406));
    });

    it('should not be able to create a user with usersId as a string', async () => {
        const customer = await createCustomer({
            body: {
                usersId: 'a'
            },
        } as Request, createResponse());

        expect(customer.status(406));
    });
});

describe('updateCustomer', () => {
    let request  = createRequest({
        method: 'PUT',
        params: {
            customerId: ''
        }
    });

    it('should not be able to update a customer with empty customerId', async () => {
        const customer = await updateCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            customerId: 'a'
        }
    });

    it('should not be able to update a customer with customerId as a string', async () => {
        const customer = await updateCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            customerId: 1,
            usersId: ''
        }
    });

    it('should not be able to update a customer with empty usersId', async () => {
        const customer = await updateCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            customerId: 1,
            usersId: 'a'
        }
    });

    it('should not be able to update a customer with usersId as a string', async () => {
        const customer = await updateCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            customerId: 1,
            usersId: 'a'
        },
        body: {
            name: ''
        }
    });

    it('should not be able to update a customer with empty name', async () => {
        const customer = await updateCustomer(request, createResponse());

        expect(customer.status(406));
    });

});

describe('deleteCustomer', () => {
    let request  = createRequest({
        method: 'DELETE',
        params: {
            customerId: ''
        }
    });

    it('should not be able to delete a customer with empty customerId', async () => {
        const customer = await deleteCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'DELETE',
        params: {
            customerId: 'a'
        }
    });

    it('should not be able to delete a customer with customerId as a string', async () => {
        const customer = await deleteCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'DELETE',
        body: {
            usersId: ''
        },
        params: {
            customerId: 1
        }
    });

    it('should not be able to delete a customer with empty usersId', async () => {
        const customer = await deleteCustomer(request, createResponse());

        expect(customer.status(406));
    });

    request  = createRequest({
        method: 'DELETE',
        body: {
            usersId: 'a'
        },
        params: {
            customerId: 1
        }
    });

    it('should not be able to update a customer with usersId as a string', async () => {
        const customer = await deleteCustomer(request, createResponse());

        expect(customer.status(406));
    });
});