import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface CustomInputProps<T extends FieldValues> {
  name: Path<T>;            // Garante que só aceita chaves válidas do seu formulário
  control: Control<T>;      // Control herdado do useForm do componente pai
  label: string;
  defaultValue?: string | null;
}

export function InputPreco<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue
}: CustomInputProps<T>) {
  
  return (     
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur, ref } }) => (
        <NumericFormat          
          className="border border-gray-300 rounded-md py-1 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue" 
          placeholder={label}
          defaultValue={defaultValue}
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
        />
      )}
    />    
  );
};