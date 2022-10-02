import { prisma } from "../prisma";

export async function createProductsLogService(productsId: number, quantity: number, price: number, usersId?: number, customersId?: number, returningAt?: any) {
    return await prisma.productsLog.create({
        data: {
            productsId,
            quantity,
            price,
            returningAt,
            usersId,
            customersId
        }
    });
}

export async function returninProductsLogService(productsId: number, customersId: number, usersId?: number) {
    const transaction = await prisma.productsLog.findFirst({
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

    return await prisma.productsLog.update({
        where: {
            id: transaction?.id
        },
        data: {
            updatedAt: new Date(),
            returnedAt: new Date(),
            usersId
        }
    });
}

export async function listProductsLogService(pendingReturn?: string, startAt?: string, endAt?: string, method?: string, customersList?: any, productsList? : any) {

    return await prisma.productsLog.findMany({
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
}