'use client';

import * as React from "react"
import { NumericFormat } from 'react-number-format';

interface InputValorProps {
  placeholder: string;
  prefix?: string;
}

export const InputValor = ({placeholder, prefix = ''}: InputValorProps) => {
  const [name, setName] = React.useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevents the browser from reloading the page
//     alert(`The name you entered was: ${name}`);
//   }

  return (
    // <input type="text" 
    //     className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue" 
    //     placeholder={placeholder} size={7} value={name} onChange={(e) => setName(e.target.value)} />
    
    <NumericFormat 
        className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue"
        placeholder={placeholder}
        value={null}
        size={10}
        thousandSeparator="." 
        decimalSeparator=","
        prefix={prefix} 
        decimalScale={0} 
        fixedDecimalScale={false} 
        allowNegative={false}
        onChange={(e) => setName(e.target.value)}
    />
  );
};