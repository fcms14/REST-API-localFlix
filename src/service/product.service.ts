import { prisma } from "../prisma";

export const product = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const list = async (type?: string, title?: string, method?: string) => {
        return await database.products.findMany({
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
    };
    
    const select = async (productId: number) => {
        return await database.products.findUnique({ where: { id: productId } });
    };
    
    const create = async (usersId: number, type: string, title: string, method: string, inventory: number, price: number) => {
        return await database.products.create({
            data: {
                usersId,
                type,
                title,
                method,
                inventory,
                price
            }
        });
    };
    
    const update = async (productId: number, usersId: number, type: string, title: string, method: string, inventory: number, price: number) => {
        return await database.products.update({
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
    };
    
    const updateProductInventory = async (productId: number, inventory: number, usersId?: number) => {
        return await database.products.update({
            where: {
                id: productId,
            },
            data: {
                usersId,
                inventory,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (productId: number, usersId: number) => {
        return await database.products.update({
            where: {
                id: productId,
            },
            data: {
                usersId,
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, updateProductInventory, remove };
}
