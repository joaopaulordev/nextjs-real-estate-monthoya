'use client'; 

import { FilterRealEstates } from "@/components/filter-real-estates/filter-real-estates";
import { ListRealEstates } from "@/components/list-real-estates/list-real-estates";
import useImoveisListar from "@/contexts/imovel/hooks/use-imoveis-listar";
import { ImovelNewFormSchema } from "@/contexts/imovel/models/schema-imovel";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from "react";

export default function RealEstates() {
  const [paramData, setParamData] = React.useState<ImovelNewFormSchema | undefined>(undefined);
  
  const params = useParams();
  const action = params.action; 

  const searchParams = useSearchParams();
  const rawData = searchParams.get('data'); // Extract 'data' from URL

  let title = "";
  if (action === "buy") {
    title = "Imóveis à venda em Paranavaí-PR";
  } else if (action === "rent") {
    title = "Imóveis para locação em Paranavaí-PR";
  } else if (action === "all") {
    title = "Todos Imóveis em Paranavaí-PR";
  } else if (action === "search") {
    title = "Pesquise Seus Imóveis em Paranavaí-PR";  
    useEffect(() => {      
      setParamData(JSON.parse(decodeURIComponent(rawData || "")));      
    }, []);    
  }

  const handleFilterResponse = (responseFilter: ImovelNewFormSchema) => {      
    setParamData(responseFilter);        
  };
  
  const { response, responseCount, isLoading} = useImoveisListar({
    ativo: true,
    finalidade: Number(paramData?.finalidadeId || 0),
    pretensao: Number(paramData?.pretensaoId || 0),
    tipo_imoveis: paramData?.tipoImoveis?.map((tipo: { value: number; label: string }) => tipo.value) || [],
    valor_inicial: Number(paramData?.valor_inicial || 0),
    valor_final: Number(paramData?.valor_final || 0)
  });  

  return (
    <div className="border-t border-blue w-full mb-10">        
      <h2 className="text-2xl text-blue mt-4 mb-4">{title}</h2>   
     
      <FilterRealEstates count={responseCount} imovelFormSchema={paramData} onSubmit={handleFilterResponse} />   
      
      <ListRealEstates type="ver-todos" buttonIsVisible={true} imoveis={response} />
    </div>
  );
}
