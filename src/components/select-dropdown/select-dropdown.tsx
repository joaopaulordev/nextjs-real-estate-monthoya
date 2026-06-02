interface SelectDropdownProps {
  list: Array<{ id: number; descricao: string }>;  
  placeholder?: string;
}

export const SelectDropdown = ({ list, placeholder, ...props }: SelectDropdownProps) => {

  return (
      <select defaultValue="default" {...props} className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue"> 
        <option value="default" disabled>{placeholder || 'Selecione...'}</option>       
        {list?.map((item) => (
          <option key={`${placeholder}-${item.id}`} value={`${item.id}`}>{item.descricao}</option>  
        ))}
        <option value="0">Todos</option>
      </select>
  );
};