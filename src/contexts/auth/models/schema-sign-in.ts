import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: 'Forneça um e-mail válido.' }),
  password: z.string().min(1, { message: 'Forneça uma senha.' }),
})

export type SignInSchema = z.infer<typeof signInSchema>;