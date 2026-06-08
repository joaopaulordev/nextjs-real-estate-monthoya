"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";

interface UseImoveisListar {
  ativo?: boolean | true;
  destaque?: boolean | false;
  lancamento?: boolean | false;
  mais_visualizado?: boolean | false,
  finalidade?: number | 0;
  pretensao?: number | 0;
  tipo_imoveis?: number[];
  valor_inicial?: number | 0;
  valor_final?: number | 0;
}

export default function useImoveisListar( params: UseImoveisListar) {  
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['imoveis-listar', params],
    queryFn: () => api.post("/imoveis/listar", { ...params }).then((res) => res.data),
  });

  return {
    response: response?.imoveis || [],
    isLoading: isLoading,
    responseCount: response?.count || 0,
  };
}