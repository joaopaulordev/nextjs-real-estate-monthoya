'use client'; 

import { ListRealEstates } from "@/components/list-real-estates/list-real-estates";
import useImoveisListar from "@/contexts/imovel/hooks/use-imoveis-listar";
import { ImovelNewFormSchema } from "@/contexts/imovel/models/schema-imovel";
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from "react";


export default function RealEstates() {
  const [paramData, setParamData] = React.useState<ImovelNewFormSchema | undefined>(undefined);
    
  const params = useParams();
  const action = params.action; 
  
  let title = "";
  if (action === "destaques") {
    title = "Todos Imóveis em Destaque de Paranavaí-PR";   
    useEffect(() => {    
      setParamData({...paramData, ativo: true, destaque: true})      
    }, []);   
  } else if (action === "lancamentos") {
    title = "Todos Imóveis em Lançamento de Paranavaí-PR";
    useEffect(() => {    
      setParamData({...paramData, ativo: true, lancamento: true})      
    }, []);   
  } else if (action === "mais-visualizados") {
    title = "Top 15 Imóveis Mais Visualizados de Paranavaí-PR"; 
    useEffect(() => {    
      setParamData({...paramData, ativo: true, mais_visualizado: true})      
    }, []);  
  }

  let { response, responseCount, isLoading} = useImoveisListar({
    ativo: true,
    destaque: Boolean(paramData?.destaque || false),
    lancamento: Boolean(paramData?.lancamento || false)
  }); 


  if (paramData?.mais_visualizado === true) {
    const sorted = response?.toSorted((a, b) => b.visualizacoes - a.visualizacoes);
    response = sorted?.slice(0, 15).map((item) => (item))
  }

  return (
    <div className="border-t border-blue w-full mb-10">        
      <h2 className="text-2xl text-blue mt-4 mb-4">{title}</h2>   

      <span className="text-base text-blue mt-2">Exibindo {responseCount} Imóveis</span>

      <hr className="border-t border-gray-300 my-4"></hr>
     
      <ListRealEstates buttonIsVisible={false} imoveis={response} />
    </div>
  );
}
