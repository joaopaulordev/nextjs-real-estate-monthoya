import Link from "next/link";

interface ListRealEstatesProps {
  title?: string;
  quantity?: number;
}

export const ListRealEstates = ({ title, quantity }: ListRealEstatesProps) => {
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
          {[...Array(quantity)].map((_, index) => (
            <Link href={`/imovel/${index}`} key={index}>            
              <div className="relative bg-white rounded-lg shadow p-4 w-85">
                <img
                  src="/6954a0c2-e5d3-4358-8528-d7c8262fb637.jpeg"
                  alt="Imagem do imóvel"
                  className="w-full h-48 object-cover rounded mb-4"
                />                                 
                {index % 2 === 0 ? (
                  <span className="absolute top-2 left-2 bg-blue text-white text-xs font-bold px-2 py-1 rounded">Venda</span>
                ) : (
                    <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">Locação</span>                                                                          
                )}                
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">Apartamento Moderno</h3>
                  <p className="font-regular text-xs">Avenida José Felipe Tequinha, 11 Jardim Oásis - Paranavaí - PR</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue">R$ 480.000</span>
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
            Ver todos {title} - <span className="text-xs text-white">{quantity} disponíveis</span>
          </Link>
        </div>        
     </div>
    
  );
};