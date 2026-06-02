import { Search } from 'lucide-react';
import { InputValor } from '@/components/input-valor';
import useFinalidades from '@/contexts/finalidade/hooks/use-finalidades';
import usePretensoes from '@/contexts/pretensao/hooks/use-pretensoes';

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import useTipoImoveis from '@/contexts/tipo-imovel/hooks/use-tipo-imovel';
import { SelectDropdown } from '../select-dropdown';
import { useRouter } from "next/navigation";

const imovelNewFormSchema = z.object({
  finalidadeId: z.string().optional(),
  pretensaoId: z.string().optional(),
  tipoImoveis: z.array(z.object({ value: z.number(), label: z.string() })).optional(),
  valorMin: z.string().optional(),
  valorMax: z.string().optional(),
});

type ImovelNewFormSchema = z.infer<typeof imovelNewFormSchema>;

export const SectionHero = () => {
  const router = useRouter();
  const { responseFinalidades, isLoadingFinalidades } = useFinalidades();
  const { responsePretensoes, isLoadingPretensoes } = usePretensoes();
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();

  const form = useForm<ImovelNewFormSchema>({
      resolver: zodResolver(imovelNewFormSchema),
      defaultValues: {
        tipoImoveis: [] 
      },
  });

  function handleSubmit(payload: ImovelNewFormSchema) {
    console.log(payload);
    const serializedData = encodeURIComponent(JSON.stringify(payload));
    router.push(`/real-estate/list/search?data=${serializedData}`);
  }


  return (
      <section className="bg-blue-100 rounded-lg border">
        <div className="relative grid grid-cols-1 md:grid-cols-2 px-16 gap-1 min-h-80 md:h-144">
          <div className="absolute z-10 top-20 left-5 w-150 flex flex-col items-center justify-center gap-4 text-start md:gap-6 md:pl-16">
            <h1 className="text-5xl font-sans">
              Encontre um lar perfeito que você vai amar.
            </h1>

            <div className="text-lg text-start">
              Nós fornecemos um serviço completo para vendas, compras e aluguel de imóveis. Encontre a casa dos seus sonhos com a gente.
            </div>
          </div>

          <div className="absolute z-10 top-100 left-20 md:w-250 bg-white/90 rounded-lg">

            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col items-start justify-center gap-2 p-4"> 
              <div className="flex items-center gap-4">
                <SelectDropdown list={responseFinalidades?.finalidades} placeholder="Finalidade" {...form.register("finalidadeId", { required: "Selecione uma finalidade" })}/>
                <SelectDropdown list={responsePretensoes?.pretensoes} placeholder="Pretensao" {...form.register("pretensaoId", { required: "Selecione uma pretensão" })}/>
              
                <Controller
                  name="tipoImoveis"
                  control={form.control}
                  rules={{ required: "Selecione pelo menos um tipo de imóvel" }} // Validation rules
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      className="min-w-143" // Adjust width as needed
                      placeholder="Tipo de imóvel"
                      ref={ref}
                      options={responseTipoImoveis?.tipoImoveis?.map((tipo) => ({ value: tipo.id, label: tipo.descricao }))} // Map API response to Select options                    
                      value={value} 
                      onChange={onChange} // Directly passes selected array back to React Hook Form
                      isMulti // Enables the multi-select dropdown functionality
                      classNamePrefix="react-select"
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-start gap-4 w-full">
                <InputValor placeholder="Valor mínimo" {...form.register("valorMin")}/>
                <InputValor placeholder="Valor máximo" {...form.register("valorMax")}/>            
                
                <button type="submit" className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600 cursor-pointer">
                  <Search size={20} />
                  Pesquisar
                </button>
              </div>
            </form>
      
          </div>

          <div className="absolute inset-0 hidden md:h-full md:order-last items-center justify-end md:flex lg:flex">
            <img
              src="/section-hero.png"
              alt="Ilustração com ícones de store, tag e sacola"
              width={150}
              height={100}
              className="h-full w-auto object-contain"
            />
          </div>  
        </div>
      </section>
  );
};