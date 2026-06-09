'use client';

import { ImovelNewFormSchema } from '@/contexts/imovel/models/schema-imovel';
import { Controller, UseFormStateProps } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface InputPrecoProps {
  form: UseFormStateProps<ImovelNewFormSchema>;
  name: string;
}

export const InputPreco = ({form, name, ...props}) => {
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value, onBlur, ref } }) => (
        <NumericFormat          
          className="border border-gray-300 rounded-md py-1 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue" 
          value={value}          
          onBlur={onBlur}
          getInputRef={ref} // Crucial for focus management & validation
          thousandSeparator="."
          decimalSeparator=","
          prefix={'R$ '}
          decimalScale={2}
          fixedDecimalScale={true}
          // Extract the unformatted float number (e.g., 1250.50)
          onValueChange={(values) => {
            onChange(values.value); 
          }}
          {...props}
        />
      )}
    />
  );
};