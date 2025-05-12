import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const AutoMaskSchema = z.object({
    imageUrl: z.string().url(),
});

export class AutoMaskDto extends createZodDto(AutoMaskSchema) {}
