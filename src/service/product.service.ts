import { prisma } from "../prisma";

export async function listProductService(type?: string, title?: string, method?: string) {
    return await prisma.products.findMany({
        where: {
            type: {
                contains: type,
            },
            title: {
                contains: title,
            },
            method: {
                contains: method,
            }
        }
    });
}

export async function selectProductService(productId: number) {
    return await prisma.products.findUnique({ where: { id: productId } });
}

export async function createProductService(usersId: number, type: string, title: string, method: string, inventory: number, price: number) {
    return await prisma.products.create({
        data: {
            usersId,
            type,
            title,
            method,
            inventory,
            price
        }
    });
}

export async function updateProductService(productId: number, usersId: number, type: string, title: string, method: string, inventory: number, price: number) {
    return await prisma.products.update({
        where: {
            id: productId,
        },
        data: {
            usersId,
            type,
            title,
            method,
            inventory,
            price,
            updatedAt: new Date()
        }
    });
}

export async function updateProductInventoryService(productId: number, inventory: number, usersId?: number) {
    return await prisma.products.update({
        where: {
            id: productId,
        },
        data: {
            usersId,
            inventory,
            updatedAt: new Date()
        }
    });
}

export async function deleteProductService(productId: number, usersId: number) {
    return await prisma.products.update({
        where: {
            id: productId,
        },
        data: {
            usersId,
            deletedAt: new Date()
        }
    });
}
