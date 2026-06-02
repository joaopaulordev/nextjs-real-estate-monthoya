
'use client'; 

import { FilterRealEstates } from "@/components/filter-real-estates/filter-real-estates";
import { ListRealEstates } from "@/components/list-real-estates/list-real-estates";
import useFinalidade from "@/contexts/finalidade/hooks/use-finalidade";
import usePretensao from "@/contexts/pretensao/hooks/use-pretensao";

import { useParams, useSearchParams } from 'next/navigation';


export default function RealEstates() {
  const params = useParams();
  const action = params.action; 

  const searchParams = useSearchParams();
  const rawData = searchParams.get('data'); // Extract 'data' from URL

  let paramObj = null;
  let title = "";
  if (action === "buy") {
    title = "Imóveis à venda em Paranavaí-PR";
  } else if (action === "rent") {
    title = "Imóveis para locação em Paranavaí-PR";
  } else if (action === "all") {
    title = "Todos Imóveis em Paranavaí-PR";
  } else if (action === "search") {
    title = "Pesquise Seus Imóveis em Paranavaí-PR";
    paramObj = JSON.parse(decodeURIComponent(rawData || ""));        
  }

  const { responseFinalidade, isLoadingFinalidade } = useFinalidade(Number(paramObj?.finalidadeId));
  const { responsePretensao, isLoadingPretensao } = usePretensao(Number(paramObj?.pretensaoId));


  return (
    <div className="border-t border-blue w-full mb-10">        
      <h2 className="text-2xl text-blue mt-4 mb-4">{title}</h2>   

      <FilterRealEstates />   
      
     
      <span>{paramObj && JSON.stringify(paramObj)}</span> 
      <div className="flex items-center gap-4 mt-4">
        <span className="text-base text-blue mt-2">Finalidade: {responseFinalidade?.finalidade?.descricao || "Não especificada"}</span>
        <span className="text-base text-blue mt-2">Pretensão: {responsePretensao?.pretensao?.descricao || "Não especificada"}</span>
        <span className="text-base text-blue mt-2">Tipos de Imóveis: {paramObj?.tipoImoveis?.map((tipo: any) => tipo.label).join(", ") || "Não especificada"}</span>
        <span className="text-base text-blue mt-2">Valor Mínimo: {paramObj?.valorMin || "Não especificado"}</span>
        <span className="text-base text-blue mt-2">Valor Máximo: {paramObj?.valorMax || "Não especificado"}</span>
      </div>




      <ListRealEstates imoveis={[]} />
    </div>
  );
}
