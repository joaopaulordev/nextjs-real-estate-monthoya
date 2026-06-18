import { api } from "@/helpers/api";
import { InteressadoNewFormSchema } from "../models/schema-interessado";
import { toast } from "sonner";
import { ResponseInteressado } from "../models/response-interessado";


export default function useInteressado(id_imovel: string) {
  
  async function createInteressado(payload: InteressadoNewFormSchema) {       
    try {
      const { data } = await api.post<ResponseInteressado>(`/interessados/adicionar/${id_imovel}`, {
        nome: payload.nome,
        email: payload.email,
        telefone: payload.telefone,
        mensagem: payload.mensagem,
        estado: payload.estado,
        cidade: payload.cidade
      });
      
      toast.success(`${data.interessado.nome} seu interesse foi enviado com sucesso.`)    
    } catch (error) {
      toast.error("Erro ao realizar intersse.");
      throw error;
    }
  }

  return {
    createInteressado    
  };
}
