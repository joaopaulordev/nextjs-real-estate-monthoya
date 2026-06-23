'use client';

import ImageGalleryModal from "@/components/image-slider/image-gallery-modal";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react"
import { ListRealEstates } from "@/components/list-real-estates";
import useConfiguracoes from "@/contexts/configuracao/hooks/use-configuracoes";
import useImoveisDestaque from "@/contexts/imovel/hooks/use-imoveis-destaque";
import { useParams } from "next/navigation";
import usePretensoes from "@/contexts/pretensao/hooks/use-pretensoes";
import useTipoImoveis from "@/contexts/tipo-imovel/hooks/use-tipo-imovel";
import { priceFormatter } from "@/helpers/formatter";
import { useForm } from "react-hook-form";
import { interessadoNewFormSchema, InteressadoNewFormSchema } from "@/contexts/interessado/models/schema-interessado";
import { zodResolver } from "@hookform/resolvers/zod";
import useInteressado from "@/contexts/interessado/hooks/use-interessado";
import { useEffect, useState } from "react";
import useImovelView from "@/contexts/imovel/hooks/use-imovel-view";
import useConfigWhatsapp from "@/contexts/config-whatsapp/hooks/use-config-whatsapp";
import useImoveisSimilares from "@/contexts/imovel/hooks/use-imoveis-similares";


export default function RealEstate() {
  const [phone, setPhone] = useState('');
  const [fullUrl, setFullUrl] = useState('');

  const params = useParams();
  const id = params.id; 

  const { responseImovel, isLoadingImovel } = useImovelView(Number(id)); 
  
  const { responseConfigWhatsapp, isLoadingConfigWhatsapp } = useConfigWhatsapp();
  const objConfigWhatsapp = responseConfigWhatsapp.find(config => config.ativo == true)
    
  const { responseImoveisSimilares, isLoadingImoveisSilares } = useImoveisSimilares(Number(id));

  const { responsePretensoes, isLoadingPretensoes } = usePretensoes();
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();

  const valorFormatado = priceFormatter.format(responseImovel?.valor!)

  const { createInteressado } = useInteressado(String(id));

  useEffect(() => {    
    setFullUrl(window.location.href);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(interessadoNewFormSchema),
    defaultValues: {
        nome: "",
        email: "",
        telefone: "",        
    }
  });
    
  const onSubmit = async (payload: InteressadoNewFormSchema) => {    
    await createInteressado(payload);          
    setValue("nome", "")
    setValue("email", "")
    setValue("telefone", "")    
    setValue("mensagem", "")
  }

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Limit total numeric entries to 11 digits
    const limited = cleaned.slice(0, 11);

    // Apply sequential masking rules based on character length
    let formatted = limited;
    if (limited.length > 0) {
      formatted = `(${limited.slice(0, 2)}`;
    }
    if (limited.length > 2) {
      formatted += `) ${limited.slice(2, 6)}`;
    }
    if (limited.length > 6) {
      // Switches structure dynamically if a 9th digit is introduced
      const separatorIndex = limited.length > 10 ? 7 : 6;
      formatted = `(${limited.slice(0, 2)}) ${limited.slice(2, separatorIndex)}-${limited.slice(separatorIndex)}`;
    }

    setPhone(formatted);
  };

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
                <ImageGalleryModal fotos={responseImovel?.fotos} /> 
                
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
                
                {responseImovel?.localizacao_desc &&
                    <div>
                        <h2 className="text-2xl font-semibold">Localização</h2>
                        <p className="text-base text-justify text-gray-700">
                            {responseImovel?.localizacao_desc}
                        </p>
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/${responseImovel?.localizacao_img}`} alt="Mapa do imóvel" className="rounded-lg mt-4" />
                    </div>
                }
                

                <div className="bg-primary-50 pt-3 pl-3 pb-5 rounded-lg w-full flex flex-col gap-0">
                    <h2 className="text-2xl font-semibold">Imóveis semelhantes</h2>
                    <ListRealEstates buttonIsVisible={false} imoveis={responseImoveisSimilares} />
                </div>
 
            </div>  
            <div className="sticky top-4 flex flex-col items-start justify-center gap-4 w-full">                
                {/* <div className="flex items-cente justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg w-full cursor-pointer"> */}
                    <a href={`https://api.whatsapp.com/send?phone=${objConfigWhatsapp?.telefone}&text=${objConfigWhatsapp?.mensagem} ${fullUrl}`} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg w-full">
                        <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
                        <span className="text-sm text-white font-semibold">WhatsApp</span>
                    </a>
                {/* </div>   */}
            
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full bg-primary-50 p-4 rounded-lg">
                    <span className="text-lg font-medium">Interessou no Imóvel?</span>
                    <span className="text-sm text-gray-600">Preencha o formulário abaixo e entraremos em contato com você!</span>
                    
                    <div className="flex flex-col gap-0.5">                    
                        <input {...register("nome")} type="text" placeholder="Nome" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                        {errors.nome?.message && (
                            <span className="text-red-700 text-[13px]">
                                {errors.nome?.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-0.5"> 
                        <input {...register("email")} type="email" placeholder="E-mail" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                        {errors.email?.message && (
                            <span className="text-red-700 text-[13px]">
                                {errors.email?.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-0.5"> 
                        <input {...register("telefone")} type="tel" value={phone} onChange={handlePhoneChange} placeholder="(99) 99999-9999" maxLength={15} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" />
                        {errors.telefone?.message && (
                            <span className="text-red-700 text-[13px]">
                                {errors.telefone?.message}
                            </span>
                        )}
                    </div>

                    <textarea {...register("mensagem")} placeholder="Mensagem" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" rows={4}></textarea>

                    <Button type="submit" variant="default" className="flex items-center gap-2">                    
                        Enviar
                    </Button>
                </form>
                <div className="flex flex-col gap-4 bg-accent p-4 rounded-lg w-full">
                    <h3 className="text-blue text-lg font-bold">Todos Detalhes do Imóvel</h3>                    
                    <ul className="list-disc list-inside text-blue text-base gap-2 flex flex-col">
                        {responseImovel && responseImovel.area_construida !== undefined && responseImovel?.area_construida > 0 &&                            
                            <li>Área Construída de {responseImovel.area_construida} m²</li>                            
                        }     
                        {responseImovel && responseImovel.area_total !== undefined && responseImovel?.area_total > 0 &&
                            <li>Área Total de {responseImovel.area_total} m²</li>
                        }                        
                        {responseImovel && responseImovel.dormitorios !== undefined && responseImovel?.dormitorios > 0 &&
                            <li>{responseImovel.dormitorios} Quarto</li>
                        }   
                        {responseImovel && responseImovel.banheiros !== undefined && responseImovel?.banheiros > 0 &&                        
                            <li>{responseImovel.banheiros} Banheiro</li>
                        }
                        {responseImovel && responseImovel.suites !== undefined && responseImovel?.suites > 0 &&
                            <li>{responseImovel.suites} Suíte</li>
                        }
                        {responseImovel && responseImovel.vagas_garagem !== undefined && responseImovel?.vagas_garagem > 0 &&                        
                            <li>{responseImovel.vagas_garagem} Total Garagem</li>
                        }                        
                        {responseImovel && responseImovel.vagas_garagem_cobertas !== undefined && responseImovel?.vagas_garagem_cobertas > 0 &&                        
                            <li>{responseImovel.vagas_garagem_cobertas} Garagem Coberta</li>
                        }                        
                        {responseImovel && responseImovel.vagas_garagem_descobertas !== undefined && responseImovel?.vagas_garagem_descobertas > 0 &&                        
                            <li>{responseImovel.vagas_garagem_descobertas} Garagem Descobertas</li>
                        }
                    </ul>
                </div>
            </div>          
        </div>

    </div>    
  );
}
