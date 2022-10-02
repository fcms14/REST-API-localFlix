import { Request } from 'express';
import { createResponse, createRequest } from 'node-mocks-http';
import { createUser, selectUser, updateUser, deleteUser } from './user.controller';

describe('selectUser', () => {
    let request  = createRequest({
        method: 'GET',
        params: {
            userId: ''
        }
    });

    it('should not be able to select a user with empty userId', async () => {
        const user = await selectUser(request, createResponse());

        expect(user.status(406));
    });

    request  = createRequest({
        method: 'GET',
        params: {
            userId: 'a'
        }
    });

    it('should not be able to create a user with userId as a string', async () => {
        const user = await selectUser(request, createResponse());

        expect(user.status(406));
    });
});

describe('createUser', () => {
    it('should not be able to create a user with empty name', async () => {
        const user = await createUser({
            body: {
                name: ''
            },
        } as Request, createResponse());

        expect(user.status(406));
    });
});

describe('updateUser', () => {
    let request  = createRequest({
        method: 'PUT',
        params: {
            userId: ''
        }
    });

    it('should not be able to update a user with empty userId', async () => {
        const user = await updateUser(request, createResponse());

        expect(user.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            userId: 'a'
        }
    });

    it('should not be able to update a user with userId as a string', async () => {
        const user = await updateUser(request, createResponse());

        expect(user.status(406));
    });

    request  = createRequest({
        method: 'PUT',
        params: {
            userId: 1
        },
        body: {
            name: ''
        }
    });

    it('should not be able to update a user with empty name', async () => {
        const user = await updateUser(request, createResponse());

        expect(user.status(406));
    });

});

describe('deleteUser', () => {
    let request  = createRequest({
        method: 'DELETE',
        params: {
            userId: ''
        }
    });

    it('should not be able to delete a user with empty userId', async () => {
        const user = await deleteUser(request, createResponse());

        expect(user.status(406));
    });

    request  = createRequest({
        method: 'DELETE',
        params: {
            userId: 'a'
        }
    });

    it('should not be able to delete a user with userId as a string', async () => {
        const user = await deleteUser(request, createResponse());

        expect(user.status(406));
    });
});