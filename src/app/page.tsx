import { ListRealEstates } from "@/components/list-real-estates";
import { OurPartners } from "@/components/our-partners";
import { PropertyToSell } from "@/components/property-to-sell";
import { SectionHero } from "@/components/section-hero";
import { TopAgents } from "@/components/top-agents";

export default function Home() {

  return (
    <>    
      <SectionHero />      

      <OurPartners />

      <ListRealEstates title="Imóveis em destaque" quantity={6} />

      <PropertyToSell />

      <ListRealEstates title="Imóveis Mais Visualizados" quantity={8} />

      <TopAgents />

      <ListRealEstates title="Imóveis Para Venda" quantity={6} />
    </>
  );
}
