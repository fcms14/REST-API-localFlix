import { prisma } from "../prisma";
import { Product, ProductCreate } from "../model/product.model";

export const product = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const list = async (product?: Product) => {
        return await database.products.findMany({
            where: {
                type: {
                    contains: product?.type,
                },
                title: {
                    contains: product?.title,
                },
                method: {
                    contains: product?.method,
                }
            }
        });
    };
    
    const select = async (product: Product) => {
        return await database.products.findUnique({ where: { id: Number(product.productId) || Number(product.productsId) } });
    };
    
    const create = async (product: ProductCreate) => {
        return await database.products.create({
            data: product
        });
    };
    
    const update = async (product: ProductCreate) => {
        return await database.products.update({
            where: {
                id: product.productId,
            },
            data: {
                usersId: product.usersId,
                type: product.type,
                title: product.title,
                method: product.method,
                inventory: product.inventory,
                price: product.price,
                updatedAt: new Date()
            }
        });
    };
    
    const updateProductInventory = async (product: Product) => {
        return await database.products.update({
            where: {
                id: product.productId,
            },
            data: {
                usersId: product.usersId,
                inventory: product.inventory,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (product: Product) => {
        return await database.products.update({
            where: {
                id: product.productId,
            },
            data: {
                usersId: product.usersId,
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, updateProductInventory, remove };
}
