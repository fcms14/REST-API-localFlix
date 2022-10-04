import { prisma } from "../prisma";
import { Customer, CustomerCreate } from "../model/customer.model";

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
    
    const select = async (customer: Customer) => {
        return await database.customers.findUnique({ where: { id: Number(customer.customerId) } });
    };
    
    const create = async (customer: CustomerCreate) => {
        return await database.customers.create({
            data: customer
        });
    };
    
    const update = async (customer: CustomerCreate) => {
        return await database.customers.update({
            where: {
                id: customer.customerId,
            },
            data: {
                name: customer.name,
                usersId: customer.usersId ? !isNaN(customer.usersId) ? customer.usersId : undefined : undefined,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (customer: Customer) => {
        return await database.customers.update({
            where: {
                id: customer.customerId,
            },
            data: {
                usersId: customer.usersId ? !isNaN(customer.usersId) ? customer.usersId : undefined : undefined,
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, remove };
}
