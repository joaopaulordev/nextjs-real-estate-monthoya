'use client';

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from "lucide-react"

// 1. Define your dynamic data structure
type FilterOption = {
  id: string
  label: string
  checked: boolean
}


export const DropDownTipoImovel = () => {
  // 2. Manage the dynamic options in state
  const [options, setOptions] = React.useState<FilterOption[]>([
    { id: "opt-1", label: "Apartamento", checked: false },
    { id: "opt-2", label: "Casa", checked: true },
    { id: "opt-3", label: "Sala Comercial", checked: false },
    { id: "opt-4", label: "Salão", checked: false },
    { id: "opt-5", label: "Terreno", checked: false },
    { id: "opt-6", label: "Garagem", checked: false },
  ])
    
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
        {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        {/* 4. Dynamically map over the options array */}
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={option.checked}
            onCheckedChange={() => handleToggle(option.id)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};