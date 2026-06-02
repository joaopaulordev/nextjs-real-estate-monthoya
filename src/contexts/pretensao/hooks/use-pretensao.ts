"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { ResponsePretensao } from "../models/responsePretensao";



export default function usePretensao(pretensaoId: number) {
  const { data: response, isLoading, isError, error } = useQuery<ResponsePretensao>({
    queryKey: ['pretensao', pretensaoId],
    queryFn: () => fetcher(`/pretensoes/visualizar/${pretensaoId}`),
  });

  return {
    responsePretensao: response || [],
    isLoadingPretensao: isLoading,
  };
}