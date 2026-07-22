import { api } from "@/helpers/api";
import { FinalidadeNewFormSchema } from "../models/schema-finalidade";
import { toast } from "sonner";
import { ResponseFinalidade } from "../models/responseFinalidade";


export default function useFinalidadeUpdate(id_finalidade: number | undefined) {
  
  async function updateFinalidade(payload: FinalidadeNewFormSchema) {       
    try {
      const { data } = await api.put<ResponseFinalidade>(`/finalidades/atualizar/${id_finalidade}`, {
        descricao: payload.descricao,
      });
      
      toast.success(`Finalidade "${data.finalidade.descricao}" atualizada com sucesso!`)    
    } catch (error) {
      toast.error("Erro ao atualizar finalidade.");
      throw error;
    }
  }

  return {
    updateFinalidade    
  };
}
