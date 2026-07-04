'use client'

import useGetProfile from '@/contexts/auth/hooks/use-get-profile'
import { LogOut } from 'lucide-react'
import axios from 'axios';

export function Profile() {
  try {
    const { responseProfile, isLoadingProfile } = useGetProfile();
  } catch (error: unknown) {      
      if (axios.isAxiosError(error)) {
        // setError(error.response?.data.detail)
        console.log("error.response = ", error)
      } 
    }  

  return (
    <div className="flex items-center gap-3">
      {/* <img
        src="https://github.com/joaopaulordev.png"
        className="h-10 w-10 rounded-full"
        alt=""
      /> */}

      <div className="flex flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-100">
          {/* {responseProfile?.nome} */}
        </span>
        <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
          {/* {responseProfile?.email} */}
        </span>
      </div>

      <a href="/api/auth/sign-out" title='Sair'>
        <LogOut className="h-5 w-5 text-zinc-500" /> 
      </a>
    </div>
  )
}