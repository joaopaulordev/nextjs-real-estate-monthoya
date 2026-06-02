'use client';

import * as React from "react"
import { NumericFormat } from 'react-number-format';

interface InputValorProps {
  placeholder: string;
}

export const InputValor = ({placeholder, ...props}: InputValorProps) => {

  return (
      <input
        type="number"        
        placeholder={placeholder}
        className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue"        
        {...props}
      />
  );
};