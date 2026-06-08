"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";


export default function useImoveisLancamento() {
  const { data: responseLanc, isLoadingLanc, isErrorLanc, errorLanc } = useQuery<Response>({
    queryKey: ['imoveis-lancamento'],
    queryFn: () => api.post("/imoveis/listar", { ativo: true, lancamento: true }).then((res) => res.data),
  });

  return {
    responseLancamento: responseLanc?.imoveis?.slice(0, 2).map((item) => (item)) || [] || [],
    isLoadingImoveisLanc: isLoadingLanc,
  };
}