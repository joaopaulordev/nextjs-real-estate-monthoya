"use client";

import { ListRealEstates } from "@/components/list-real-estates";
import { OurPartners } from "@/components/our-partners";
import { PropertyToSell } from "@/components/property-to-sell";
import { SectionHero } from "@/components/section-hero";
import { TopAgents } from "@/components/top-agents";
import useImoveisDestaque from "@/contexts/imovel/hooks/use-imoveis-destaque";
import useImoveisLancamento from "@/contexts/imovel/hooks/use-imoveis-lancamento";
import useImoveisMaisVisualizados from "@/contexts/imovel/hooks/use-imoveis-mais-visualizado";

export default function Home() {

  const { responseDestaque, isLoadingImoveisDestaque } = useImoveisDestaque();
  const { responseLancamento, isLoadingImoveisLanc } = useImoveisLancamento();
  const { imoveisSortedByViews, isLoadingImoveisViews } = useImoveisMaisVisualizados();

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
