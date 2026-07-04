import "../(main)/globals.css";
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";
import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "./components/sidebar";
import QueryProvider from "../QueryProvider";

const inter = Inter({
  subsets: ['latin'],
  variable:'--font-sans',
  fallback: ['Arial', 'sans-serif'], // Arial is used while Inter loads
})

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (!await isAuthenticated() ) {
    redirect('/auth/sign-in')
  }

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>        
        <div className="flex items-start justify-start h-full dark:bg-zinc-900">
          <QueryProvider>
            <Sidebar />
            <main className="max-w-[100vw] max-h-[100vw] px-4 pb-12 pt-24">
              {children}
            </main>  
          </QueryProvider> 
        </div>
      </body>
    </html>
  );
}