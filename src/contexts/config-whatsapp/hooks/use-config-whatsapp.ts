"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { Response } from "../models/response";



export default function useConfigWhatsapp() {
  const { data: response, isLoading, isError, error } = useQuery<Response>({
    queryKey: ['config-whatsapp'],
    queryFn: () => fetcher("/config-whatsapp/listar"),
  });

  return {
    responseConfigWhatsapp: response?.config_whatsapps || [],
    isLoadingConfigWhatsapp: isLoading,
  };
}