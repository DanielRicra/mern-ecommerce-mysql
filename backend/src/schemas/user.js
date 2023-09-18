import { z } from 'zod';

const userSchema = z.object({
   email: z.string().email({ message: 'Provide a valid email' }),
   firstName: z.string().trim().min(1),
   lastName: z.string().trim().min(1),
   password: z.string().min(8),
   isAdmin: z.boolean().optional().default(false),
});

export function validateUser(input) {
   return userSchema.safeParse(input);
}
