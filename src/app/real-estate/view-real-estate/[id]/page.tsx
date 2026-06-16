'use client';

import ImageGalleryModal from "@/components/image-slider/image-gallery-modal";
import { ListRealEstates } from "@/components/list-real-estates";
import { Button } from "@/components/ui/button";
import useConfiguracoes from "@/contexts/configuracao/hooks/use-configuracoes";
import useImoveisDestaque from "@/contexts/imovel/hooks/use-imoveis-destaque";
import { MapPin, Share2 } from "lucide-react"
import { useParams } from 'next/navigation';





export default function RealEstate() {
  const params = useParams();
  const id = params.id; 

  const { responseConfiguracoes, isLoadingConfiguracoes } = useConfiguracoes();
  const { responseDestaque, isLoadingImoveisDestaque } = useImoveisDestaque(responseConfiguracoes[0]?.quantidade);

  return (
    <div className="border-t border-blue w-full mb-10">   
        <div className="flex flex-col gap-5 mt-4">
            <div className="flex gap-2">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-2 rounded">Locação</span>  
                <span className="bg-blue text-white text-xs font-bold px-3 py-2 rounded">Sobrado</span>         
                <span className="bg-blue text-white text-xs font-bold px-3 py-2 rounded">Código: {id}</span> 
            </div>  
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-start justify-center gap-1">
                    <h3 className="text-3xl font-semibold">Apartamento Moderno Com 2 Quartos</h3>   
                    <p className="flex items-center gap-1 font-regular text-base">
                        <MapPin className="" size={16} />
                        Avenida José Felipe Tequinha, 11 Jardim Oásis - Paranavaí - PR
                    </p>
                </div>
                <div className="flex flex-col items-end justify-center">
                    <span className="text-3xl font-bold text-blue">R$ 2.500</span>   
                    <span className="text-sm text-gray-600">Valor do aluguel: R$ 2.500/mês</span>
                </div>   
            </div>    
        </div>

        <hr className="border-t border-gray-300 my-4"></hr>

  
        <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-start justify-center gap-10">                
                {/* <ImageSlider />                                     */}
                <ImageGalleryModal /> 
                
                <div className="bg-primary-50 p-4 rounded-lg w-full mt-4">
                    <div className="mt-2 flex items-center justify-center gap-10">
                        <div className="flex flex-col items-center gap-1">                            
                            <img src="/area-privativa.png" alt="Área Privada" className="w-6 h-6"/>
                            <span className="text-base mr-2 text-blue">Área Privativa 150 m²</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">                            
                            <img src="/quartos.png" alt="Total de quartos" className="w-6 h-6"/>
                            <span className="text-base mr-2 text-blue">3 Quartos</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/banheiros.png" alt="Total de banheiros" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">2 Banheiros</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/suites.png" alt="Total de suites" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">3 Suítes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img src="/garagem.png" alt="Total de vagas" className="w-6 h-6" />
                            <span className="text-base mr-2 text-blue">2 Vagas</span>
                        </div>
                    </div> 
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Sobre o Imóvel</h2>
                    <p className="text-base text-justify text-gray-700">
                        Este apartamento moderno com 2 quartos é perfeito para quem busca conforto e praticidade. Localizado em uma área privilegiada, oferece fácil acesso a escolas, supermercados e transporte público. O imóvel conta com uma sala de estar espaçosa, cozinha equipada, banheiro moderno e uma varanda com vista para a cidade. Ideal para famílias ou profissionais que desejam morar em um ambiente acolhedor e bem localizado.
                    </p>            
                </div>
                <div className="bg-primary-50 p-4 rounded-lg w-full flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Características do Imóvel</h2>
                    <ul className="list-disc list-inside text-gray-700 text-base gap-2 flex flex-col">
                        <li>Localização Privilegiada: Próximo a escolas, supermercados e transporte público.</li>
                        <li>Condomínio com segurança 24 horas.</li>
                        <li>Academia e piscina no condomínio.</li>
                        <li>Área de lazer para crianças.</li>
                        <li>Permite animais de estimação.</li>
                        <li>Próximo a parques e áreas verdes.</li>
                        <li>Ótima iluminação natural.</li>
                        <li>Acabamento de alta qualidade.</li>
                        <li>Próximo a centros comerciais e restaurantes.</li>
                        <li>Facilidade de acesso a rodovias e transporte público.</li>
                        <li>Ótimo para famílias ou profissionais que buscam conforto e praticidade.</li>
                    </ul>
                </div>
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
                        <li>Área Privativa de 150 m²</li>
                        <li>Área Total de 250 m²</li>
                        <li>2 Quartos</li>
                        <li>1 Banheiro</li>
                        <li>1 Sala de Estar</li>
                        <li>Cozinha Equipada</li>
                        <li>2 Vaga de Garagem</li>
                        <li>1 Vaga de Garagem Coberta</li>
                        <li>Varanda com Vista para a Cidade</li>
                    </ul>
                </div>
            </div>          
        </div>

    </div>    
  );
}
