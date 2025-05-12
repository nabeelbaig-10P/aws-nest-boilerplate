import { PrismaClient } from '@prisma/client';
import { gardenStyles } from 'prisma/seed-data/garden-style';

const prisma = new PrismaClient();

export const gardenStyleSeed: () => Promise<void> = async (): Promise<void> => {
    const seedName = 'gardenStyle-seed';

    const existingSeed = await prisma.seedHistory.findUnique({
        where: { name: seedName },
    });

    if (existingSeed) {
        console.log(`Seed ${seedName} already executed.`);
        return;
    }

    const gardenStylesData = gardenStyles.map((gardenStyle) => ({
        name: gardenStyle.name,
        description: gardenStyle.description,
        imageUrl: gardenStyle.image,
    }));

    await prisma.gardenStyle.createMany({
        data: gardenStylesData,
    });

    await prisma.seedHistory.create({
        data: { name: seedName },
    });

    console.log(`Seed ${seedName} completed.`);
};
