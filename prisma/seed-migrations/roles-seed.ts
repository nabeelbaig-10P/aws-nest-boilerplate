import { PrismaClient } from '@prisma/client';
import { roles } from 'prisma/seed-data/roles';

const prisma = new PrismaClient();

export const rolesSeed: () => Promise<void> = async (): Promise<void> => {
    const seedName = 'roles-seed';

    const existingSeed = await prisma.seedHistory.findUnique({
        where: { name: seedName },
    });

    if (existingSeed) {
        console.log(`Seed ${seedName} already executed.`);
        return;
    }

    const rolesData = roles.map((role) => ({
        name: role.name,
        description: role.description,
    }));

    await prisma.role.createMany({
        data: rolesData,
    });

    await prisma.seedHistory.create({
        data: { name: seedName },
    });

    console.log(`Seed ${seedName} completed.`);
};
