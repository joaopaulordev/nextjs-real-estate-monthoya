import { z } from "zod";

export const imovelNewFormSchema = z.object({
  ativo: z.boolean().optional(),
  destaque: z.boolean().optional(),
  lancamento: z.boolean().optional(), 
  mais_visualizado: z.boolean().optional(),  
  finalidadeId: z.string().optional(),
  pretensaoId: z.string().optional(),
  tipoImoveis: z.array(z.object({ value: z.number(), label: z.string() })).optional(),
  valor_inicial: z.string().optional(),
  valor_final: z.string().optional(),
});

export type ImovelNewFormSchema = z.infer<typeof imovelNewFormSchema>;