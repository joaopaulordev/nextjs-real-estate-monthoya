"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { setTokenCookie } from "./actions";
import { SignInSchema, signInSchema } from "@/contexts/auth/models/schema-sign-in";
import useSignIn from "@/contexts/auth/hooks/use-sign-in";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import axios from 'axios';


export default function Login() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
        email: "",
        password: "",        
    }
  });
  
  const onSubmit = async (payload: SignInSchema) => {
    try {
      const { token } = await useSignIn(payload)      
      setTokenCookie(token)  
    } catch (error: unknown) {
      // This extracts the specific message sent back by your server
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.detail)
      } 
    }    
  }
  

  return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-xs">          
          <div className="space-y-4">
            {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="size-4" />
                  <AlertTitle>Falha no login!</AlertTitle>
                  <AlertDescription>
                    <p>{error}</p>
                  </AlertDescription>
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input type="email" id="email" placeholder="E-mail" {...register("email")}         
                />
                {errors.email?.message && (
                    <span className="text-red-700 text-[13px]">
                        {errors.email?.message}
                    </span>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>                
                <PasswordInput id="password" placeholder="senha" {...register("password")}/>

                {errors.password?.message && (
                    <span className="text-red-700 text-[13px]">
                        {errors.password?.message}
                    </span>
                )}
              </div>

              <Button className="w-full" type="submit" disabled={false}>
                {false ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
  )
}
