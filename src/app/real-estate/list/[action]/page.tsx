'use client'; 

import { FilterRealEstates } from "@/components/filter-real-estates/filter-real-estates";
import { ListRealEstates } from "@/components/list-real-estates/list-real-estates";
import useImoveisListar from "@/contexts/imovel/hooks/use-imoveis-listar";
import { ImovelNewFormSchema } from "@/contexts/imovel/models/schema-imovel";
import { useParams } from 'next/navigation';
import React, { useEffect } from "react";


export default function RealEstates() {
  const [paramToSearch, setParamToSearch] = React.useState<ImovelNewFormSchema>();  
  
  const params = useParams();
  const action = params.action; 

  const title = "Pesquise Imóveis em Paranavaí-PR";
  if (action === "search") {      
    useEffect(() => {
      const rawData = sessionStorage.getItem('sharedObject');
      if (rawData) {        
        setParamToSearch(JSON.parse(rawData))                
        sessionStorage.removeItem('sharedObject');
      }
    }, []);
  }

  const handleFilterResponse = (responseFilter: ImovelNewFormSchema) => {   
    console.log("responseFilter = ", responseFilter)           
    setParamToSearch(responseFilter);        
  };
  
  const { response, responseCount, isLoading} = useImoveisListar({
    ativo: true,
    finalidade: Number(paramToSearch?.finalidadeId || 0),
    pretensao: Number(paramToSearch?.pretensaoId || 0),
    tipo_imoveis: paramToSearch?.tipoImoveis?.map((tipo: { value: number; label: string }) => tipo.value) || [],
    valor_inicial: Number(paramToSearch?.valor_inicial || 0),
    valor_final: Number(paramToSearch?.valor_final || 0),
    dormitorios: Number(paramToSearch?.dormitorios || 0),
    banheiros: Number(paramToSearch?.banheiros || 0),
    suites: Number(paramToSearch?.suites || 0),
    vagas: Number(paramToSearch?.vagas || 0),
    area_total_min: Number(paramToSearch?.area_total_min || 0),
    area_total_max: Number(paramToSearch?.area_total_max || 0),
    area_construida_min: Number(paramToSearch?.area_construida_min || 0),
    area_construida_max: Number(paramToSearch?.area_construida_max || 0)
  });  

  return (
    <div className="border-t border-blue w-full mb-10">        
      <h2 className="text-2xl text-blue mt-4 mb-4">{title}</h2>   
     
      <FilterRealEstates count={responseCount} paramData={paramToSearch} onTrigger={handleFilterResponse} />   
      
      <ListRealEstates buttonIsVisible={false} imoveis={response} />
    </div>
  );
}
