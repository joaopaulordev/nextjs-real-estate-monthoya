"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";



export default function useFinalidades() {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['finalidades'],
    queryFn: () => fetcher("/finalidades/listar"),
  });

  return {
    responseFinalidades: response || [],
    isLoadingFinalidades: isLoading,
  };
}