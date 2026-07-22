import { z } from "zod";

export const finalidadeNewFormSchema = z.object({
  descricao: z.string().min(1, { message: "Descrição obrigatória" }).max(500),
});

export type FinalidadeNewFormSchema = z.infer<typeof finalidadeNewFormSchema>;