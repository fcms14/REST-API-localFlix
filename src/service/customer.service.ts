import { prisma } from "../prisma";
import { Customer } from "../model/customer.model";

export const customer = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const list = async (customer?: Customer) => {
        return await database.customers.findMany({
            where: {
                name: {
                    contains: customer?.name,
                }
            }
        });
    };
    
    const select = async (customerId: number) => {
        return await database.customers.findUnique({ where: { id: customerId } });
    };
    
    const create = async (name: string, usersId: number) => {
        return await database.customers.create({
            data: {
                name,
                usersId
            }
        });
    };
    
    const update = async (customerId: number, name: string, usersId: number) => {
        return await database.customers.update({
            where: {
                id: customerId,
            },
            data: {
                name,
                usersId,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (customerId: number, usersId: number) => {
        return await database.customers.update({
            where: {
                id: customerId,
            },
            data: {
                usersId,
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, remove };
}
