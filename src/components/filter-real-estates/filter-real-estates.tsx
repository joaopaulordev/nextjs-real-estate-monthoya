"use client"

import React, { useEffect, useState } from 'react';
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
import { InputPreco } from '@/components/input-preco';
import useFinalidades from '@/contexts/finalidade/hooks/use-finalidades';
import usePretensoes from '@/contexts/pretensao/hooks/use-pretensoes';
import useTipoImoveis from '@/contexts/tipo-imovel/hooks/use-tipo-imovel';
import { SelectDropdown } from '../select-dropdown';
import { imovelNewFormSchema, ImovelNewFormSchema } from '@/contexts/imovel/models/schema-imovel';
import { InputArea } from '../input-area';
import { InputRadioGroup } from '../input-radio-group';


interface FilterRealEstatesProps {
  count: number;
  paramData: ImovelNewFormSchema | undefined;
  onTrigger: (data: ImovelNewFormSchema) => void;
}

export const FilterRealEstates = ({ count, paramData, onTrigger }: FilterRealEstatesProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const { responseFinalidades, isLoadingFinalidades } = useFinalidades();
  const { responsePretensoes, isLoadingPretensoes } = usePretensoes();
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();

  useEffect(() => {    
    setLoading(false);  
    form.reset({
      dormitorios: "",
      banheiros: "",
      suites: "",
      vagas: ""
    });

  }, []);


  const form = useForm<ImovelNewFormSchema>({
      resolver: zodResolver(imovelNewFormSchema),
  });

  function handleSubmit(payload: ImovelNewFormSchema) {                 
    if (onTrigger){
      onTrigger(payload)
    }
  }

  function clearFields() {        
    form.reset({
      valor_inicial: "",
      valor_final: "",
      finalidadeId: "default",
      pretensaoId: "default",
      area_total_min: "",
      area_total_max: "",
      area_construida_min: "",
      area_construida_max: "",
      tipoImoveis: [],
      dormitorios: "",
      banheiros: "",
      suites: "",
      vagas: ""
    });
    
    form.handleSubmit(handleSubmit)();
  }

  if (loading) return <p>Carregando...</p>;

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
              <SelectDropdown list={responseFinalidades} selectedValue={paramData?.finalidadeId} placeholder="Finalidade" {...form.register("finalidadeId", { required: "Selecione uma finalidade" })}/>
              <SelectDropdown list={responsePretensoes} selectedValue={paramData?.pretensaoId} placeholder="Pretensão" {...form.register("pretensaoId", { required: "Selecione uma pretensão" })}/>
              
                <Controller
                  name="tipoImoveis"
                  control={form.control}
                  // rules={{ required: "Selecione pelo menos um tipo de imóvel" }} // Validation rules
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      isMulti // Enables the multi-select dropdown functionality
                      instanceId="page-select" 
                      className="min-w-143" // Adjust width as needed
                      placeholder="Tipo de imóvel"
                      ref={ref}                     
                      options={responseTipoImoveis?.map((tipo) => ({ value: tipo.id, label: tipo.descricao }))} // Map API response to Select options
                      value={value} // Set the value from the form schema                      
                      defaultValue={paramData?.tipoImoveis?.map((tipo) => ({ value: tipo.value, label: tipo.label }))}
                      onChange={onChange} // Directly passes selected array back to React Hook Form                      
                      classNamePrefix="react-select"                      
                    />
                  )}
                />
          </div>  

          <div className="w-full flex items-center justify-center gap-7">
            <InputRadioGroup {...form.register("dormitorios")} title="Dormitórios"  />
            <InputRadioGroup {...form.register("banheiros")} title="Banheiros" />
            <InputRadioGroup {...form.register("suites")} title="Suítes" />
            <InputRadioGroup {...form.register("vagas")} title="Vagas" />
          </div>    
          
          <div className="w-full flex items-center justify-center gap-7">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <span className="text-base text-blue font-semibold">Valor Imóvel</span>
              <div className="flex items-center justify-start gap-1">
                <InputPreco<ImovelNewFormSchema> control={form.control} name="valor_inicial" label="Valor Mínimo" defaultValue={paramData?.valor_inicial} />
                <InputPreco<ImovelNewFormSchema> control={form.control} name="valor_final" label="Valor Máximo" defaultValue={paramData?.valor_final} />
              </div>              
            </div>                         
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <span className="text-base text-blue font-semibold">Área total (m²)</span>
              <div className="flex items-center justify-start gap-1">                
                <InputArea placeholder="Área mínima" {...form.register("area_total_min")}/>
                <InputArea placeholder="Área máxima" {...form.register("area_total_max")} />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <span className="text-base text-blue font-semibold">Área construída (m²)</span>
              <div className="flex items-center justify-start gap-1">
                <InputArea placeholder="Área mínima" {...form.register("area_construida_min")}/>
                <InputArea placeholder="Área máxima" {...form.register("area_construida_max")} />
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-4">
            <button type="button" onClick={() => clearFields()} className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-500 cursor-pointer">
              <X size={20} />
              Limpar
            </button>

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


