"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";



export default function usePretensoes() {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['pretensoes'],
    queryFn: () => fetcher("/pretensoes/listar"),
  });

  return {
    responsePretensoes: response || [],
    isLoadingPretensoes: isLoading,
  };
}