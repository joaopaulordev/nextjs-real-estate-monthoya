// "use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { ResponseFinalidade } from "../models/responseFinalidade";

export default function useFinalidade(finalidadeId: number) {
  const { data: response, isLoading, isError, error } = useQuery<ResponseFinalidade>({
    queryKey: ['finalidade', finalidadeId],
    queryFn: () => fetcher(`/finalidades/visualizar${finalidadeId ? `/${finalidadeId}` : ''}`),
  });

  return {
    responseFinalidade: response || [],
    isLoadingFinalidade: isLoading,
  };
}