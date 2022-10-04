import { prisma } from "../prisma";
import { User, UserCreate } from "../model/user.model";

export const user = (mock?: typeof prisma) => {
    const database = mock || prisma;

    const list = async (user?: User) => {
        return await database.users.findMany({
            where: {
                name: {
                    contains: user?.name,
                }
            }
        });
    };
    
    const select = async (user: User) => {
        return await database.users.findUnique({ where: { id: Number(user.userId) || Number(user.usersId)  } });
    };
    
    const create = async (user: UserCreate) => {
        return await database.users.create({
            data: user
        });
    };
    
    const update = async (user: UserCreate) => {
        return await database.users.update({
            where: {
                id: user.userId,
            },
            data: {
                name: user.name,
                updatedAt: new Date()
            }
        });
    };
    
    const remove = async (user: User) => {
        return await database.users.update({
            where: {
                id: Number(user.userId),
            },
            data: {
                deletedAt: new Date()
            }
        });
    };

    return { list, select, create, update, remove };
}
