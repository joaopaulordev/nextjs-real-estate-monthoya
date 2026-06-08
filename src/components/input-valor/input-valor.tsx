// 'use client';

export const InputValor = ({...props}) => {

  return (
      <input
        type="text"                
        className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue"        
        {...props}
      />
  );
};