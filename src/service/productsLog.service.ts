import { prisma } from "../prisma";
import { ProductsLog, ProductsLogCreate, ProductsFilters } from "../model/productsLog.model";

export const transaction = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const create = async (productsLog : ProductsLogCreate) => {
        return await database.productsLog.create({
            data: productsLog
        });
    };
    
    const returning = async (productsLog: ProductsLog) => {
        const transaction = await database.productsLog.findFirst({
            where: {
                productsId:  productsLog.productsId,
                customersId: productsLog.customersId,
                returnedAt:  null,
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
                updatedAt:  new Date(),
                returnedAt: new Date(),
                usersId: productsLog.usersId
            }
        });
    };
    
    const list = async (productsLog: ProductsFilters, customersList?: any, productsList?: any) => {
        return await database.productsLog.findMany({
            where: {
                productsId: productsList.length ? { in: productsList} : undefined,
                customersId: customersList.length ? { in: customersList} : undefined,
                createdAt: productsLog.startAt ? { gte: new Date(productsLog.startAt)} : undefined,
                AND: [
                    {createdAt: productsLog.endAt ? {lte: new Date( productsLog.endAt)} : undefined}
                ],
                returnedAt: productsLog.pendingReturn === "true" ? null : undefined,
                returningAt: productsLog.method === 'selling' ? null : undefined,
                NOT: [
                    { returningAt: productsLog.pendingReturn ? null : undefined },
                    { returnedAt: productsLog.pendingReturn === "false" ? null : undefined }
                ]
            }
        });
    };

    return { create, returning, list };
}
