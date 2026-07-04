import type { Metadata } from "next";
import { Inter, PT_Sans_Caption } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";
import QueryProvider from "./QueryProvider";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Imobiliária Monthoya",
  description: "Encrote seu imóvel aqui!",
};

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '500'],
//   variable: '--font-inter',
// });

// const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable:'--font-sans',
  fallback: ['Arial', 'sans-serif'], // Arial is used while Inter loads
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <div className={`${inter.className} min-h-screen bg-white`}>  
          <div className="mx-auto max-w-375 px-8">
            <Header />
            <main className="flex flex-col gap-10">
              <QueryProvider>
                {children}
                <Toaster richColors position="bottom-center" />
              </QueryProvider>
            </main>            
            <Footer />
          </div>      
        </div>
      </body>
    </html>
  );
}
