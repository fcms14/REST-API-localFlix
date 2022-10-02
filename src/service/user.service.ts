import { prisma } from "../prisma";

export async function listUserService(name?: string) {
    return await prisma.users.findMany({
        where: {
            name: {
                contains: name,
            }
        }
    });
}

export async function selectUserService(userId: number) {
    return await prisma.users.findUnique({ where: { id: userId } });
}

export async function createUserService(name: string) {
    return await prisma.users.create({
        data: {
            name
        }
    });
}

export async function updateUserService(userId: number, name: string) {
    return await prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            name,
            updatedAt: new Date()
        }
    });
}

export async function deleteUserService(userId: number) {
    return await prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            deletedAt: new Date()
        }
    });
}
