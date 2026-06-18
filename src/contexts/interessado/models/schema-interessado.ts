import { z } from "zod";

export const interessadoNewFormSchema = z.object({
  nome: z.string().min(1, { message: "Nome obrigatório" }).max(255),  
  email: z.string().min(1, { message: "Email obrigatório" }).max(255),
  telefone: z.string().min(1, { message: "Telefone obrigatório" }).max(25),
  mensagem: z.string().optional(),
  estado: z.number().default(18),
  cidade: z.string().default("Paranavaí")
});

export type InteressadoNewFormSchema = z.infer<typeof interessadoNewFormSchema>;