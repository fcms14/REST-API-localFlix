import { prisma } from "../prisma";

export async function listCustomerService(name?: string) {
    return await prisma.customers.findMany({
        where: {
            name: {
                contains: name,
            }
        }
    });
}

export async function selectCustomerService(customerId: number) {
    return await prisma.customers.findUnique({ where: { id: customerId } });
}

export async function createCustomerService(name: string, usersId: number) {
    return await prisma.customers.create({
        data: {
            name,
            usersId
        }
    });
}

export async function updateCustomerService(customerId: number, name: string, usersId: number) {
    return await prisma.customers.update({
        where: {
            id: customerId,
        },
        data: {
            name,
            usersId,
            updatedAt: new Date()
        }
    });
}

export async function deleteCustomerService(customerId: number, usersId: number) {
    return await prisma.customers.update({
        where: {
            id: customerId,
        },
        data: {
            usersId,
            deletedAt: new Date()
        }
    });
}
