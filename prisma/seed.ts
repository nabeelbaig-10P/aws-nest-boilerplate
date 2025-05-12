import * as process from 'node:process';
import { gardenStyleSeed } from './seed-migrations/garden-style-seed';
import { rolesSeed } from './seed-migrations/roles-seed';
import { yardTypesSeed } from './seed-migrations/yard-types-seed';

const main = async (): Promise<void> => {
    await rolesSeed();
    await gardenStyleSeed();
    await yardTypesSeed();

    console.log('Database seeded successfully!');
    process.exit(0);
};

main().catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
});
