import { prisma } from "../prisma";

export const user = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const list = async (name?: string) => {
        return await database.users.findMany({
            where: {
                name: {
                    contains: name,
                }
            }
        });
    };
    
    const select = async (userId: number) => {
        return await database.users.findUnique({ where: { id: userId } });
    };
    
    const create = async (name: string) => {
        return await database.users.create({
            data: {
                name
            }
        });
    };
    
    const update = async (userId: number, name: string) => {
        return await database.users.update({
            where: {
                id: userId,
            },
            data: {
                name,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (userId: number) => {
        return await database.users.update({
            where: {
                id: userId,
            },
            data: {
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, remove };
}
