import { createResponse, createRequest } from 'node-mocks-http';
import { createProductsLog } from './productsLog.controller';

describe('createProductsLog', () => {
    it('should not be able to create a transaction with empty productsId', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '' }    });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with productsId as a string', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: 'a' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with empty method', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: '' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with method not allowed', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'teste' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with empty quantity', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'renting', quantity: '' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with quantity less than or equal to 0', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'renting', quantity: 0 } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with empty returningAt if method equals to renting', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'renting', quantity: 1, returningAt: '' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with empty customersId if method equals to renting', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'renting', quantity: 1, returningAt: '2022-10-21', customersId: '' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });

    it('should not be able to create a transaction with customersId as a string if method equals to renting', async () => {
        const request  = createRequest({ method: 'POST', body: { productsId: '1', method: 'renting', quantity: 1, returningAt: '2022-10-21', customersId: '' } });
        expect((await createProductsLog(request, createResponse())).statusCode).toBe(406);
    });
});
