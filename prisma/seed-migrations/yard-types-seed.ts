import { PrismaClient } from '@prisma/client';
import { yardTypes } from 'prisma/seed-data/yard-types';

const prisma = new PrismaClient();

export const yardTypesSeed: () => Promise<void> = async (): Promise<void> => {
    const seedName = 'yard-types-seed';

    const existingSeed = await prisma.seedHistory.findUnique({
        where: { name: seedName },
    });

    if (existingSeed) {
        console.log(`Seed ${seedName} already executed.`);
        return;
    }

    const yardTypesData = yardTypes.map((yardType) => ({
        name: yardType.name,
        code: yardType.code,
    }));

    await prisma.yardType.createMany({
        data: yardTypesData,
    });

    await prisma.seedHistory.create({
        data: { name: seedName },
    });

    console.log(`Seed ${seedName} completed.`);
};
