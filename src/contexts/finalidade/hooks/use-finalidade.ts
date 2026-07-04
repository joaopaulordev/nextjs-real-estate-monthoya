import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { ResponseFinalidade } from "../models/responseFinalidade";
import { Finalidade } from "../models/finalidade";

export default function useFinalidade(finalidadeId: number): { responseFinalidade: Finalidade | null, isLoadingFinalidade: boolean } {
  const { data: response, isLoading, isError, error } = useQuery<ResponseFinalidade>({
    queryKey: ['finalidade', finalidadeId],
    queryFn: () => fetcher(`/finalidades/visualizar${finalidadeId ? `/${finalidadeId}` : ''}`),
  });

  return {
    responseFinalidade: response?.finalidade || null,
    isLoadingFinalidade: isLoading,
  };
}