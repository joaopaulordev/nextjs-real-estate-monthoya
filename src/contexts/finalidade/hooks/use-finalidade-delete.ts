import { api } from "@/helpers/api";
import { FinalidadeNewFormSchema } from "../models/schema-finalidade";
import { toast } from "sonner";
import { ResponseFinalidade } from "../models/responseFinalidade";


export default function useFinalidadeDelete() {
  
  async function deleteFinalidade(id: number | undefined) {       
    try {
      const { data } = await api.delete<string>(`/finalidades/deletar/${id}`);
      
      toast.success(data.message || "Finalidade deletada com sucesso.");    
    } catch (error) {
      toast.error("Erro ao deletar finalidade.");
      throw error;
    }
  }

  return {
    deleteFinalidade    
  };
}
