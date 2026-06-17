"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Imovel } from "../models/imovel";
import { ResponseImovelView } from "../models/response-imovel-view";


export default function useImovelView(imovelId: number): { responseImovel: Imovel | null, isLoadingImovel: boolean } {
  const { data: response, isLoading, isError, error } = useQuery<ResponseImovelView>({
    queryKey: ['imovel', imovelId],
    queryFn: () => fetcher(`/imoveis/visualizar/${imovelId}`),
  });

  return {
    responseImovel: response?.imovel || null,
    isLoadingImovel: isLoading,
  };
}