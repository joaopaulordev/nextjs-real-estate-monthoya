"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { ResponsePretensao } from "../models/responsePretensao";
import { Pretensao } from "../models/pretensao";



export default function usePretensao(pretensaoId: number): { responsePretensao: Pretensao | null, isLoadingPretensao: boolean } {
  const { data: response, isLoading, isError, error } = useQuery<ResponsePretensao>({
    queryKey: ['pretensao', pretensaoId],
    queryFn: () => fetcher(`/pretensoes/visualizar/${pretensaoId}`),
  });

  return {
    responsePretensao: response?.pretensao || null,
    isLoadingPretensao: isLoading,
  };
}