'use client';

import ImageGalleryModal from "@/components/image-slider/image-gallery-modal";
import { Button } from "@/components/ui/button";
import { MapPin, Share2 } from "lucide-react"
import useImovelView from "@/contexts/imovel/hooks/use-imovel-view";
import { ListRealEstates } from "@/components/list-real-estates";
import useConfiguracoes from "@/contexts/configuracao/hooks/use-configuracoes";
import useImoveisDestaque from "@/contexts/imovel/hooks/use-imoveis-destaque";
import { useParams } from "next/navigation";
import usePretensoes from "@/contexts/pretensao/hooks/use-pretensoes";
import useTipoImoveis from "@/contexts/tipo-imovel/hooks/use-tipo-imovel";
import { priceFormatter } from "@/helpers/formatter";

export default function RealEstate() {
  const params = useParams();
  const id = params.id; 

  const { responseImovel, isLoadingImovel } = useImovelView(Number(id));

  const { responseConfiguracoes, isLoadingConfiguracoes } = useConfiguracoes();
  const { responseDestaque, isLoadingImoveisDestaque } = useImoveisDestaque(responseConfiguracoes[0]?.quantidade);

  const { responsePretensoes, isLoadingPretensoes } = usePretensoes();
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();

  const valorFormatado = priceFormatter.format(responseImovel?.valor)

  return (
    <div className="border-t border-blue w-full mb-10">   
        <div className="flex flex-col gap-5 mt-4">
            <div className="flex gap-2">
                  {responsePretensoes?.find((p) => p.id === responseImovel?.pretensao)?.descricao === "Venda" ? (
                    <span className="bg-blue text-white text-xs font-bold px-3 py-2 rounded">Venda</span>
                  ) : (
                      <span className="bg-amber-500 text-white text-xs font-bold px-3 py-2 rounded">Locação</span>                                                                          
                  )}                 
                <span className="bg-blue text-white text-xs font-bold px-3 py-2 rounded">{responseTipoImoveis.find((t) => t.id === responseImovel?.tipo_imovel)?.descricao}</span>         
                <span className="bg-blue text-white text-xs font-bold px-3 py-2 rounded">Código: {responseImovel?.id}</span> 
            </div>  
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-start justify-center gap-1">
                    <h3 className="text-3xl font-semibold">{responseImovel?.descricao}</h3>   
                    <p className="flex items-center gap-1 font-regular text-base">
                        <MapPin className="" size={16} />
                        {responseImovel?.endereco}
                    </p>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <span className="text-3xl font-bold text-blue">{ valorFormatado }</span>  
                    {responsePretensoes?.find((p) => p.id === responseImovel?.pretensao)?.descricao === "Venda" ? (
                        <span className="text-sm text-gray-600">Valor do Total: { valorFormatado }</span>
                    ) : (
                        <span className="text-sm text-gray-600">Valor do aluguel: {valorFormatado}/mês</span>                                                                         
                    )}                      
                </div>   
            </div>    
        </div>

        <hr className="border-t border-gray-300 my-4"></hr>

  
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-start justify-center gap-10 w-[3500px]">                
                {/* <ImageSlider />                                     */}
                <ImageGalleryModal /> 
                
                <div className="bg-primary-50 p-4 rounded-lg w-full mt-4">
                    <div className="mt-2 flex items-center justify-center gap-10">
                        <div className="flex flex-col items-center gap-1">                            
                            <img src="/area-privativa.png" alt="Área Privada" className="w-6 h-6"/>
                            <span className="text-base mr-2 text-blue">Área Contruída {responseImovel?.area_construida} m²</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">                            
                            <img src="/quartos.png" alt="Total de quartos" className="w-6 h-6"/>
                            <span className="text-base mr-2 text-blue">{responseImovel?.dormitorios} Quartos</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/banheiros.png" alt="Total de banheiros" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">{responseImovel?.banheiros} Banheiros</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/suites.png" alt="Total de suites" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">{responseImovel?.suites} Suítes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/garagem.png" alt="Total de vagas" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">{responseImovel?.vagas_garagem} Vagas</span>
                        </div>
                    </div> 
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Sobre o Imóvel</h2>
                    <p className="text-base text-justify text-gray-700">
                        {responseImovel?.sobre_imovel}
                    </p>            
                </div>

                {responseImovel?.caracteristicas && responseImovel.caracteristicas.length > 0 && 
                    <div className="bg-primary-50 p-4 rounded-lg w-full flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">Características do Imóvel</h2>
                        <ul className="list-disc list-inside text-gray-700 text-base gap-2 flex flex-col">
                            {responseImovel?.caracteristicas.map((caracteristica) => (
                                <li key={caracteristica.id}>{caracteristica.descricao}</li>
                            ))} 
                        </ul>
                    </div>                    
                }

                <div>
                    <h2 className="text-2xl font-semibold">Localização</h2>
                    <p className="text-base text-justify text-gray-700">
                        O imóvel está localizado em uma área privilegiada, com fácil acesso a escolas, supermercados e transporte público.
                    </p>
                    <img src="/mapa-av-distrito.png" alt="Mapa do imóvel" className="rounded-lg mt-4" />
                </div>

                <div className="bg-primary-50 pt-3 pl-3 pb-5 rounded-lg w-full flex flex-col gap-0">
                    <h2 className="text-2xl font-semibold">Imóveis semelhantes</h2>
                    <ListRealEstates buttonIsVisible={false} imoveis={responseDestaque} />
                </div>
 
            </div>  
            <div className="sticky top-4 flex flex-col items-start justify-center gap-4 w-full max-w-xsS">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg">
                        <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
                            <span className="text-sm text-white font-semibold">WhatsApp</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Share2 className="mr-2" size={24} />
                            <span className="text-sm text-white font-semibold">Compartilhar</span>
                        </a>
                    </div>
                </div>  
                <form className="flex flex-col gap-4 w-full bg-primary-50 p-4 rounded-lg">
                    <span className="text-lg font-medium">Interessou no Imóvel?</span>
                    <span className="text-sm text-gray-600">Preencha o formulário abaixo e entraremos em contato com você!</span>
                    <input type="text" placeholder="Nome" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                    <input type="email" placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                    <input type="tel" placeholder="Telefone" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                    <textarea placeholder="Mensagem" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" rows={4}></textarea>
                    <Button type="submit" variant="default" className="flex items-center gap-2">                    
                        Enviar
                    </Button>
                </form>
                <div className="flex flex-col gap-4 bg-accent p-4 rounded-lg w-full">
                    <h3 className="text-blue text-lg font-bold">Todos Detalhes do Imóvel</h3>                    
                    <ul className="list-disc list-inside text-blue text-base gap-2 flex flex-col">
                        {responseImovel?.area_construida &&
                            <li>Área Construída de {responseImovel.area_construida} m²</li>
                        }
                        {responseImovel?.area_total && 
                            <li>Área Total de {responseImovel.area_total} m²</li>
                        }                        
                        {responseImovel?.dormitorios && 
                            <li>{responseImovel.dormitorios} Quarto</li>
                        }   
                        {responseImovel?.banheiros && 
                            <li>{responseImovel.banheiros} Banheiro</li>
                        }
                        {responseImovel?.suites && 
                            <li>{responseImovel.suites} Suíte</li>
                        }
                        {responseImovel?.vagas_garagem && 
                            <li>{responseImovel.vagas_garagem} Total Garagem</li>
                        }                        
                        {responseImovel?.vagas_garagem_cobertas && 
                            <li>{responseImovel.vagas_garagem_cobertas} Garagem Coberta</li>
                        }                        
                        {responseImovel?.vagas_garagem_descobertas && 
                            <li>{responseImovel.vagas_garagem_descobertas} Garagem Descobertas</li>
                        }                        
                    </ul>
                </div>
            </div>          
        </div>

    </div>    
  );
}
