"use client";

import { ListRealEstates } from "@/components/list-real-estates";
import { OurPartners } from "@/components/our-partners";
import { PropertyToSell } from "@/components/property-to-sell";
import { SectionHero } from "@/components/section-hero";
import { TopAgents } from "@/components/top-agents";
import useConfiguracoes from "@/contexts/configuracao/hooks/use-configuracoes";
import useImoveisDestaque from "@/contexts/imovel/hooks/use-imoveis-destaque";
import useImoveisLancamento from "@/contexts/imovel/hooks/use-imoveis-lancamento";
import useImoveisMaisVisualizados from "@/contexts/imovel/hooks/use-imoveis-mais-visualizado";

export default function Home() {

  const { responseConfiguracoes, isLoadingConfiguracoes } = useConfiguracoes(); 
      
  const { responseDestaque, isLoadingImoveisDestaque } = useImoveisDestaque(responseConfiguracoes[0]?.quantidade);
  const { responseLancamento, isLoadingImoveisLanc } = useImoveisLancamento(responseConfiguracoes[1]?.quantidade);
  const { imoveisSortedByViews, isLoadingImoveisViews } = useImoveisMaisVisualizados(responseConfiguracoes[2]?.quantidade);

  return (
    <div>
      <SectionHero />
      
      <div className="flex flex-col gap-30 mt-10 mb-20">  
        <OurPartners />

        <ListRealEstates title="Imóveis em destaque" type="destaques" imoveis={responseDestaque}/>
    
        <PropertyToSell />

        <ListRealEstates title="Lançamentos" type="lancamentos" imoveis={responseLancamento} />
        
        <TopAgents />
        
        <ListRealEstates title="Imóveis Mais Visualizados" type="mais-visualizados" imoveis={imoveisSortedByViews} />                
    </div>
  </div>    
  );
}
