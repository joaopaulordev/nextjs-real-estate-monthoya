"use client"

import React, { useState } from 'react';
import { Funnel, Search, X } from 'lucide-react';
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
import Link from 'next/link';
import { RadioGroupButton } from '../radio-group-button';
import { Button } from '../ui/button';


export const FilterRealEstates = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">      
        <div className="flex items-center justify-start gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            <Funnel className="w-5 h-5" />
            Filtros
          </button>

          <span className="text-base text-blue mt-2">Exibindo 10 de 100 imóveis</span>
        </div>

        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordenar por</SelectLabel>
              <SelectItem value="relevante">Mais Relevantes</SelectItem>
              <SelectItem value="recentes">Mais Recentes</SelectItem>                
              <SelectItem value="maior-preco">Maior Preço</SelectItem>
              <SelectItem value="menor-preco">Menor Preço</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>      
      </div>

      <hr className="border-t border-gray-300 my-4"></hr>

      {/* 1. Using logical && operator */}
      {isVisible && 
        <form className="w-full flex flex-col items-center justify-start gap-10 p-6 bg-primary-50 rounded">
          <div className="w-full flex items-center justify-center gap-4">                          
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
          </div>  

          <div className="w-full flex items-center justify-center gap-7">
            <RadioGroupButton title="Dormitórios" />
            <RadioGroupButton title="Banheiros" />
            <RadioGroupButton title="Suites" />
            <RadioGroupButton title="Vagas" />
          </div>                      
          
          <div className="w-full flex items-center justify-center gap-7">
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
              <span className="text-base text-blue font-semibold">Valor Imóvel</span>
              <div className="flex items-center justify-start gap-1">
                <InputValor placeholder="Valor mínimo" prefix="R$" />
                <InputValor placeholder="Valor máximo" prefix="R$" />
              </div>              
            </div>                         
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
              <span className="text-base text-blue font-semibold">Área total (m²)</span>
              <div className="flex items-center justify-start gap-1">
                <InputValor placeholder="Área mínima" />
                <InputValor placeholder="Área máxima" />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
              <span className="text-base text-blue font-semibold">Área construída (m²)</span>
              <div className="flex items-center justify-start gap-1">
                <InputValor placeholder="Área mínima" />
                <InputValor placeholder="Área máxima" />
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <Button variant="outline" className="px-4 py-2 cursor-pointer">
              <X size={20} />
              Limpar
            </Button>
            <Link href="/real-estate/search" className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">
              <Search size={20} />
              Pesquisar
            </Link>
          </div>            
        </form>
      }
    </div>
  );
};


