"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";



export default function useConfiguracoes() {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['configuracoes'],
    queryFn: () => fetcher("/configuracoes/listar"),
  });

  return {
    responseConfiguracoes: response?.configuracoes || [],
    isLoadingConfiguracoes: isLoading,
  };
}