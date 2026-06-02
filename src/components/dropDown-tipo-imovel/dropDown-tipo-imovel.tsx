'use client';

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from "lucide-react"
import useTipoImoveis from "@/contexts/tipo-imovel/hooks/use-tipo-imovel";
import { TipoImovel } from "@/contexts/tipo-imovel/models/tipo-imovel";


export const DropDownTipoImovel = () => {
  const { responseTipoImoveis, isLoadingTipoImoveis } = useTipoImoveis();
  const [options, setOptions] = React.useState<TipoImovel[]>([]);

  const optionsData = responseTipoImoveis?.tipoImoveis?.map((tipo) => ({
    id: tipo.id,
    descricao: tipo.descricao,
    checked: false,
  }))

  React.useEffect(() => {
    setOptions(optionsData);
  }, [optionsData] );

      
  // 3. Handle toggling individual checkboxes dynamically
  const handleToggle = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checked: !opt.checked } : opt))
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Tipo de Imóvel 
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options?.map((tipo) => (
          <DropdownMenuCheckboxItem
            key={tipo.id}
            checked={tipo.checked}
            onCheckedChange={() => handleToggle(tipo.id)}
          >
            {tipo.descricao}
          </DropdownMenuCheckboxItem>
        ))}  
      </DropdownMenuContent>
    </DropdownMenu>
  );
};