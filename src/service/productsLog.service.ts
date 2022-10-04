import { prisma } from "../prisma";

export const transaction = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const create = async (productsId: number, quantity: number, price: number, usersId?: number, customersId?: number, returningAt?: any) => {
        return await database.productsLog.create({
            data: {
                productsId,
                quantity,
                price,
                returningAt,
                usersId,
                customersId
            }
        });
    };
    
    const returning = async (productsId: number, customersId: number, usersId?: number) => {
        const transaction = await database.productsLog.findFirst({
            where: {
                productsId,
                customersId,
                returnedAt: null,
                NOT: [{ returningAt: null }]
            }
        });
    
        if (!transaction) {
    
            return null;
        }
    
        return await database.productsLog.update({
            where: {
                id: transaction?.id
            },
            data: {
                updatedAt: new Date(),
                returnedAt: new Date(),
                usersId
            }
        });
    };
    
    const list = async (pendingReturn?: string, startAt?: string, endAt?: string, method?: string, customersList?: any, productsList? : any) => {
    
        return await database.productsLog.findMany({
            where: {
                productsId: productsList.length ? { in: productsList} : undefined,
                customersId: customersList.length ? { in: customersList} : undefined,
                createdAt: startAt ? { gte: new Date(startAt)} : undefined,
                AND: [
                    {createdAt: endAt ? {lte: new Date( endAt)} : undefined}
                ],
                returnedAt: pendingReturn === "true" ? null : undefined,
                returningAt: method === 'selling' ? null : undefined,
                NOT: [
                    { returningAt: pendingReturn ? null : undefined },
                    { returnedAt: pendingReturn === "false" ? null : undefined }
                ]
            }
        });
    };

    return { create, returning, list };
}
