"use client"

import React, { useState } from 'react';
import { Funnel, Search, X } from 'lucide-react';

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InputPreco } from '@/components/input-valor';
import { RadioGroupButton } from '../radio-group-button';
import { Button } from '../ui/button';
import useFinalidades from '@/contexts/finalidade/hooks/use-finalidades';
import usePretensoes from '@/contexts/pretensao/hooks/use-pretensoes';
import useTipoImoveis from '@/contexts/tipo-imovel/hooks/use-tipo-imovel';
import { SelectDropdown } from '../select-dropdown';
import { imovelNewFormSchema, ImovelNewFormSchema } from '@/contexts/imovel/models/schema-imovel';

import { NumericFormat } from 'react-number-format';


interface FilterRealEstatesProps {
  count: number;
  imovelFormSchema: ImovelNewFormSchema | undefined;
  onSubmit?: (data: ImovelNewFormSchema) => void;
}

export const FilterRealEstates = ({ count, imovelFormSchema, onSubmit }: FilterRealEstatesProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const { responseFinalidades, isLoadingFinalidades } = useFinalidades();
  const { responsePretensoes, isLoadingPretensoes } = usePretensoes();
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();

  const form = useForm<ImovelNewFormSchema>({
      resolver: zodResolver(imovelNewFormSchema),
      defaultValues: {        
        tipoImoveis: imovelFormSchema?.tipoImoveis?.map((tipo) => ({ value: tipo.value, label: tipo.label })) || []
      },
  });

  function handleSubmit(payload: ImovelNewFormSchema) {    
    if (onSubmit) {
      onSubmit(payload);
    }
  }

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

          <span className="text-base text-blue mt-2">Exibindo {count} imóveis</span>
        </div>

        <SelectUI>
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
        </SelectUI>      
      </div>

      <hr className="border-t border-gray-300 my-4"></hr>

      {/* 1. Using logical && operator */}
      {isVisible && 
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col items-center justify-start gap-10 p-6 bg-primary-50 rounded">
          <div className="w-full flex items-center justify-center gap-4">                          
              <SelectDropdown list={responseFinalidades} selectedValue={imovelFormSchema?.finalidadeId} placeholder="Finalidade" {...form.register("finalidadeId", { required: "Selecione uma finalidade" })}/>
              <SelectDropdown list={responsePretensoes} selectedValue={imovelFormSchema?.pretensaoId} placeholder="Pretensão" {...form.register("pretensaoId", { required: "Selecione uma pretensão" })}/>
              
                <Controller
                  name="tipoImoveis"
                  control={form.control}
                  rules={{ required: "Selecione pelo menos um tipo de imóvel" }} // Validation rules
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      instanceId="page-select" 
                      className="min-w-143" // Adjust width as needed
                      placeholder="Tipo de imóvel"
                      ref={ref}                      
                      options={responseTipoImoveis?.map((tipo) => ({ value: tipo.id, label: tipo.descricao }))} // Map API response to Select options                    
                      // value={value} // Set the value from the form schema
                      defaultValue={imovelFormSchema?.tipoImoveis?.map((tipo) => ({ value: tipo.value, label: tipo.label }))} // Set default value from the form schema
                      onChange={onChange} // Directly passes selected array back to React Hook Form
                      isMulti // Enables the multi-select dropdown functionality
                      classNamePrefix="react-select"                      
                    />
                  )}
                />
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
                <InputPreco form={form} name="valor_inicial" placeholder="Valor Inicial" defaultValue={imovelFormSchema?.valor_inicial}/>
                <InputPreco form={form} name="valor_final" placeholder="Valor Final" defaultValue={imovelFormSchema?.valor_final} />
              </div>              
            </div>                         
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
              <span className="text-base text-blue font-semibold">Área total (m²)</span>
              <div className="flex items-center justify-start gap-1">
                {/* <InputValor placeholder="Área mínima" />
                <InputValor placeholder="Área máxima" /> */}
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-0.5">
              <span className="text-base text-blue font-semibold">Área construída (m²)</span>
              <div className="flex items-center justify-start gap-1">
                {/* <InputValor placeholder="Área mínima" />
                <InputValor placeholder="Área máxima" /> */}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <Button variant="outline" className="px-4 py-2 cursor-pointer">
              <X size={20} />
              Limpar
            </Button>

            <button type="submit" className="flex items-center justify-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer">
              <Search size={20} />
              Pesquisar
            </button>
          </div>            
        </form>
      }
    </div>
  );
};


