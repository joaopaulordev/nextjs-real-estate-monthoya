import { FilterRealEstates } from "@/components/filter-real-estates/filter-real-estates";
import { ListRealEstates } from "@/components/list-real-estates/list-real-estates";

type RealEstatePageProps = {
  params: Promise<{
    action: string;
  }>;
};


export default async function RealEstates({ params }: RealEstatePageProps) {
  const { action } = await params;

  let title = "";
  if (action === "buy") {
    title = "Imóveis à venda em Paranavaí-PR";
  } else if (action === "rent") {
    title = "Imóveis para locação em Paranavaí-PR";
  } else if (action === "all") {
    title = "Todos Imóveis em Paranavaí-PR";
  } else if (action === "search") {
    title = "Pesquise Seus Imóveis em Paranavaí-PR";
  }

  return (
    <div className="border-t border-blue w-full mb-10">        
      <h2 className="text-2xl text-blue mt-4 mb-4">{title}</h2>    
         
      <FilterRealEstates />   

      <ListRealEstates quantity={10} />
    </div>
  );
}
