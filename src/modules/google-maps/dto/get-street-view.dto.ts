import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const GetStreetViewSchema = z.object({
    address: z.string(),
});

export class GetStreetViewDto extends createZodDto(GetStreetViewSchema) {}
