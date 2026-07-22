import { useQuery } from "@tanstack/react-query";
import { fetcher, api } from "@/helpers/api";
import { ResponseGetProfile } from "../models/response-get-profile";

export default function useGetProfile() {
  const { data: response, isLoading, isError, error } = useQuery<ResponseGetProfile>({
    queryKey: ['get-profile'],
    queryFn: () => fetcher('/auth/get-profile'),
  });

  return {
    responseProfile: response || null,
    isLoadingProfile: isLoading,
  };
}