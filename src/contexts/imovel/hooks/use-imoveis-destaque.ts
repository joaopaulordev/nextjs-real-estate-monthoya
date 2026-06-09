"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";


export default function useImoveisDestaque(quantityToShow: number) {
  const { data: responseDestaque, isLoadingDestaque, isErrorDestaque, errorDestaque } = useQuery<Response>({
    queryKey: ['imoveis-destaque'],
    queryFn: () => api.post("/imoveis/listar", { ativo: true, destaque: true }).then((res) => res.data),
  });

  return {
    responseDestaque: responseDestaque?.imoveis?.slice(0, quantityToShow).map((item) => (item)) || [],
    isLoadingImoveisDestaque: isLoadingDestaque,
  };
}