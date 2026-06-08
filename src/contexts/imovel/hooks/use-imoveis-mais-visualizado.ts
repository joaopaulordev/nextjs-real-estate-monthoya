"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";


export default function useImoveisMaisVisualizados() {
  const { data: responseViews, isLoadingViews, isErrorViews, errorViews } = useQuery<Response>({
    queryKey: ['imoveis-views'],
    queryFn: () => api.post("/imoveis/listar", { ativo: true }).then((res) => res.data),
  });
  
  const sorted = responseViews?.imoveis.toSorted((a, b) => b.visualizacoes - a.visualizacoes);
  const listSorted = sorted?.slice(0, 3).map((item) => (item))

  return {
    imoveisSortedByViews: listSorted || [],
    isLoadingImoveisViews: isLoadingViews,
  };
}