"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helpers/api";
import { Response } from "../models/response";


export default function useImoveisSimilares(imovelId: number) {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['imoveis-similares', imovelId],
    queryFn: () => fetcher(`/imoveis/${imovelId}/similares`),
  });

  return {
    responseImoveisSimilares: response?.imoveis || [],
    isLoadingImoveisSilares: isLoading,
  };
}