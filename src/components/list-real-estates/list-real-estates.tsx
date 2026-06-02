'use client'

import { Imovel } from "@/contexts/imovel/models/imovel";
import { priceFormatter } from "@/helpers/formatter";
import Link from "next/link";


interface ListRealEstatesProps {
  title?: string;
  imoveis: Imovel[];
}

export const ListRealEstates = ({ title, imoveis }: ListRealEstatesProps) => {
    
    return (      
      <div className="">  
        <div className="flex flex-col items-center justify-center gap-2 mb-10">
          {title && 
            <>
              <h2 className="text-3xl text-center text-blue">{title}</h2>
              <div className="border-t-4 border-blue w-200"></div>
              <div className="border-t-4 border-blue w-100"></div>
              <div className="border-t-4 border-blue w-50"></div>  
            </>
          }               
        </div>                                          
        <div className="flex flex-wrap justify-center gap-6">
          {imoveis?.map((imovel) => (
            <Link href={`/real-estate/view-real-estate/${imovel.id}`} key={imovel.id}> 
              <div className="relative bg-white rounded-lg shadow p-4 w-85">                      
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${imovel.fotos.filter(foto => foto.capa == true).map(item => (item.caminho))}`}
                  alt="Imagem do imóvel"
                  className="w-full h-48 object-cover rounded mb-4"
                />                                 
                {imovel.id % 2 === 0 ? (
                  <span className="absolute top-2 left-2 bg-blue text-white text-xs font-bold px-2 py-1 rounded">Venda</span>
                ) : (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">Locação</span>                                                                          
                )}                
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{imovel.descricao}</h3>
                  <p className="font-regular text-xs">{imovel.endereco}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue">{priceFormatter.format(imovel.valor)}</span>                  
                  <span className="bg-indigo-700 text-white text-xs font-bold px-2 py-1 rounded">Sobrado</span>
                </div>                
                <hr className="border-t border-gray-300 my-4"></hr>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <img src="/Total-Beds.png" alt="Total de quartos" className="w-5 h-5"/>
                  <span className="text-xs mr-2 text-gray-400">3</span>
                  <img src="/Total-Bathrooms.png" alt="Total de banheiros" className="w-5 h-5" />
                  <span className="text-xs mr-2 text-gray-400">2</span>
                  <img src="/Total-Parking.png" alt="Total de vagas de estacionamento" className="w-5 h-5" />
                  <span className="text-xs text-gray-400">2</span>
                </div>            
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Link href="/imoveis" className="text-sm font-medium bg-blue text-white hover:bg-blue-700 py-2 px-4 rounded">
            Ver todos {title} {/* - <span className="text-xs text-white">{imoveis?.length} disponíveis</span> */}
          </Link>
        </div>        
     </div>
    
  );
};