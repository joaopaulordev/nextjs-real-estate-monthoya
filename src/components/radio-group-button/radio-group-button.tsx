"use client"

import * as React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

interface RadioGroupButtonProps {
  title: string;
}

export const RadioGroupButton = ({ title }: RadioGroupButtonProps) => {
  const [selectedValue, setSelectedValue] = React.useState("option-1");

  return (
    <div className="w-full flex flex-col items-center justify-center gap-0.5">
      <span className="text-base text-blue font-semibold">{title}</span>
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="flex items-center justify-start gap-1 ">
        <div className="cursor-pointer">
          <RadioGroupItem value="option-1" id="option-1" className="peer sr-only" />
          <Button 
            variant="outline" 
            className="peer-data-[state=checked]:bg-blue peer-data-[state=unchecked]:hover:bg-blue peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:text-primary-foreground peer-data-[state=checked]:hover:bg-blue peer-data-[state=checked]:hover:text-primary-foreground p-5"
            asChild
          >
            <p>1</p>
          </Button>
        </div>
        
        <div className="cursor-pointer">
          <RadioGroupItem value="option-2" id="option-2" className="peer sr-only" />
          <Button 
            variant="outline" 
            className="peer-data-[state=checked]:bg-blue peer-data-[state=unchecked]:hover:bg-blue peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:text-primary-foreground peer-data-[state=checked]:hover:bg-blue peer-data-[state=checked]:hover:text-primary-foreground p-5"
            asChild
          >
            <p>2</p>
          </Button>
        </div>

        <div className="cursor-pointer">
          <RadioGroupItem value="option-3" id="option-3" className="peer sr-only" />
          <Button 
            variant="outline" 
            className="peer-data-[state=checked]:bg-blue peer-data-[state=unchecked]:hover:bg-blue peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:text-primary-foreground peer-data-[state=checked]:hover:bg-blue peer-data-[state=checked]:hover:text-primary-foreground p-5"
            asChild
          >
            <p>3</p>
          </Button>
        </div>

        <div className="cursor-pointer">
          <RadioGroupItem value="option-4" id="option-4" className="peer sr-only" />
          <Button 
            variant="outline" 
            className="peer-data-[state=checked]:bg-blue peer-data-[state=unchecked]:hover:bg-blue peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:text-primary-foreground peer-data-[state=checked]:hover:bg-blue peer-data-[state=checked]:hover:text-primary-foreground p-5"
            asChild
          >
            <p>4</p>
          </Button>
        </div>

        <div className="cursor-pointer">
          <RadioGroupItem value="option-5" id="option-5" className="peer sr-only" />
          <Button 
            variant="outline" 
            className="peer-data-[state=checked]:bg-blue peer-data-[state=unchecked]:hover:bg-blue peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:text-primary-foreground peer-data-[state=checked]:hover:bg-blue peer-data-[state=checked]:hover:text-primary-foreground p-5"
            asChild
          >
            <p>5+</p>
          </Button>
        </div>
      </RadioGroup>

      <p className="mt-4 text-sm text-gray-500">
        Opção selecionada: <span className="font-bold">{selectedValue}</span>
      </p>

    </div>     
  );
};