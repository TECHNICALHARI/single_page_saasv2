import { ZodSchema } from 'zod';


export async function Validate<T>(body: unknown, schema: ZodSchema<T>): Promise<T> {
  return schema.parse(body);
}
