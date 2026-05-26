import { Search } from 'lucide-react';
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropDownTipoImovel } from "@/components/dropDown-tipo-imovel";
import { InputValor } from '@/components/input-valor';


export const SectionHero = () => {

  return (
      <section className="bg-blue-100 rounded-lg border">
        <div className="relative grid grid-cols-1 md:grid-cols-2 px-16 gap-1 min-h-80 md:h-144">
          <div className="absolute z-10 top-20 left-5 w-150 flex flex-col items-center justify-center gap-4 text-start md:gap-6 md:pl-16">
            <h1 className="text-5xl font-sans">
              Encontre um lar perfeito que você vai amar.
            </h1>

            <div className="text-lg text-start">
              Nós fornecemos um serviço completo para vendas, compras e aluguel de imóveis. Encontre a casa dos seus sonhos com a gente.
            </div>
          </div>

          <div className="absolute z-10 top-100 left-20 md:w-250 bg-white/90 rounded-lg">

            <form className="w-full flex items-center justify-start gap-4 p-6">
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Finalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="residencial">Residencial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Pretensão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="comercial">Venda</SelectItem>
                    <SelectItem value="residencial">Locação</SelectItem>                
                  </SelectGroup>
                </SelectContent>
              </Select>

              <DropDownTipoImovel />

              <InputValor placeholder="Valor mínimo" />
              <InputValor placeholder="Valor máximo" />            
              
              <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer">
                <Search size={20} />
                <Link href="/">Pesquisar</Link>
              </button>   
            </form>
      
          </div>

          <div className="absolute inset-0 hidden md:h-full md:order-last items-center justify-end md:flex lg:flex">
            <img
              src="/section-hero.png"
              alt="Ilustração com ícones de store, tag e sacola"
              width={150}
              height={100}
              className="h-full w-auto object-contain"
            />
          </div>  
        </div>
      </section>
  );
};