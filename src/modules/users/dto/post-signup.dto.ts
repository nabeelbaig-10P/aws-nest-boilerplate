import { createZodDto } from 'nestjs-zod';
import { Roles } from 'src/common/enums/roles.enum';
import { z } from 'zod';

const UsersSchema = z.object({
    cognitoId: z.string(),
    phoneNumber: z.string(),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    role: z.enum([Roles.ADMIN, Roles.USER]),
    firstName: z.string(),
    lastName: z.string(),
    country: z.string(),
    state: z.string(),
});

export class PostSignupUserDto extends createZodDto(UsersSchema) {}
