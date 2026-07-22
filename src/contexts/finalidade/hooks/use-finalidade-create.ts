import { api } from "@/helpers/api";
import { FinalidadeNewFormSchema } from "../models/schema-finalidade";
import { toast } from "sonner";
import { ResponseFinalidade } from "../models/responseFinalidade";


export default function useFinalidadeCreate() {
  
  async function createFinalidade(payload: FinalidadeNewFormSchema) {       
    try {
      const { data } = await api.post<ResponseFinalidade>('/finalidades/adicionar', {
        descricao: payload.descricao,
      });
      
      toast.success(`Finalidade "${data.finalidade.descricao}" criada com sucesso!`)    
    } catch (error) {
      toast.error("Erro ao criar finalidade.");
      throw error;
    }
  }

  return {
    createFinalidade    
  };
}
