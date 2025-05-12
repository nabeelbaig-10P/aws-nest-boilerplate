import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const AddressSchema = z.object({
    country: z.string().min(1, { message: 'Country is required' }),
    state: z.string().min(1, { message: 'State is required' }),
});

const UpdateUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
    profileImg: z.string().url().optional().nullable(),
    address: AddressSchema,
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
