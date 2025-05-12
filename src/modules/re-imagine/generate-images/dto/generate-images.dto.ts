import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const GenerateImageSchema = z.object({
    imageUrl: z.string().url().min(1),
    maskUrls: z.array(z.string().url()).nonempty(),
    maskCategory: z.string().min(1),
    spaceType: z.string().min(1),
    designTheme: z.string().optional(),
    maskingElement: z.string().optional(),
    colorPreference: z.string().optional(),
    materialPreference: z.string().optional(),
    landscapingPreference: z.string().optional(),
    generationCount: z.number().int().positive().default(1),
    additionalPrompt: z.string().optional(),
});

export class GenerateImageDto extends createZodDto(GenerateImageSchema) {}
