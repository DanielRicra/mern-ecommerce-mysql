import { z } from 'zod';

const productSchema = z.object({
   name: z.string({
      invalid_type_error: 'Product name must be a string',
      required_error: 'Product name is required ',
   }),
   categoryId: z.number({ required_error: 'Category ID is required' }).int(),
   salePrice: z.number(),
   stock: z.number().int(),
   description: z.string().optional(),
   barCode: z.string().max(150).optional(),
   imgUrl: z.string().url({ message: 'Image must be a valid URL' }),
});

export function validateProduct(input) {
   return productSchema.safeParse(input);
}

export function validatePartialProduct(input) {
   return productSchema.partial().safeParse(input);
}

const querySchema = z.object({
   name: z.string({ invalid_type_error: 'Name must be a string' }).default(''),
   page: z
      .string()
      .transform(Number)
      .pipe(
         z
            .number({ invalid_type_error: 'Page param must be a number' })
            .int({ message: 'Page param must be an integer' })
            .default(1)
      )
      .optional(),
   categoryId: z
      .string()
      .transform(Number)
      .pipe(
         z
            .number({
               invalid_type_error: 'Category ID param must be a number',
            })
            .int({ message: 'Category ID param must be an integer' })
            .min(1)
      )
      .optional(),
   take: z
      .string()
      .transform(Number)
      .pipe(
         z
            .number({ invalid_type_error: 'Take param must be a number' })
            .int({ message: 'Take param must be an integer' })
            .min(10, { message: 'Take param must be greater or equal than 10' })
            .max(50, { message: 'Take must be less or equal than 50' })
            .default(10)
      )
      .optional(),
});

export function validateQuery({ name, page, categoryId, take }) {
   return querySchema.safeParse({ name, page, categoryId, take });
}
