"use client";

import { useQuery } from "@tanstack/react-query";
import { Response } from "../models/response";
import { fetcher, api } from "@/helpers/api";


export default function useTipoImoveis() {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['tipoImoveis'],
    queryFn: () => fetcher("/tipo-imoveis/listar"),
  });

  return {
    responseTipoImoveis: response || [],
    isLoadingTipoImoveis: isLoading,
  };
}