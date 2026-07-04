import { api } from "@/helpers/api";
import { SignInSchema } from "../models/schema-sign-in";
import { ResponseSignIn } from "../models/response-sign-in";

export default async function useSignIn(payload: SignInSchema) {
  
  const { data } = await api.post<ResponseSignIn>(`/auth/login`, {
    email: payload.email,
    senha: payload.password
  });
      
  return {    
    token: data.access_token
  };
}
