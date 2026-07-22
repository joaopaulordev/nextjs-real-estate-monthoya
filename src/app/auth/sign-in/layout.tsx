import "../../globals.css";
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";
import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ['latin'],
  variable:'--font-sans',
  fallback: ['Arial', 'sans-serif'], // Arial is used while Inter loads
})

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if (await isAuthenticated()) {
    redirect('/admin')
  }

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>        
        <div>{children}</div>
      </body>
    </html>
  );
}