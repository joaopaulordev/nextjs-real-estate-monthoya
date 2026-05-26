import Link from "next/link";
import { Plus } from "lucide-react";

export const PropertyToSell = () => {

  return (
    <div className="flex items-center justify-center gap-6 rounded-lg bg-primary-50 px-6 py-8">
      <div className="flex flex-col gap-4 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-blue">Você tem um imóvel para vender ou alugar?</h2>
          <p className="text-blue">Anuncie seu imóvel conosco e alcance milhares de compradores em potencial.</p>          
        </div>
        <Link href="/publish" className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">
          <Plus size={24} />
          Anunciar Meu Imóvel
        </Link>
      </div>

      <img src="property-to-sell.png" alt="Vender imóvel" className="w-full max-w-sm rounded-md" />      
    </div>    
  );
};