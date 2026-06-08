import { Finalidade } from "@/contexts/finalidade/models/finalidade";
import { Pretensao } from "@/contexts/pretensao/models/pretensao";

interface SelectDropdownProps {
  list: Finalidade[] | Pretensao[]; 
  placeholder?: string;
  selectedValue?: string;
}

export const SelectDropdown = ({ list, placeholder, selectedValue, ...props }: SelectDropdownProps) => {
  
  return (
      <select defaultValue={`${selectedValue === undefined ? "default" : selectedValue}`} {...props} className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue"> 
        <option value="default" disabled>{placeholder || 'Selecione...'}</option>       
        {list?.map((item) => (
          <option key={`${placeholder}-${item.id}`} value={`${item.id}`}>
            {item.descricao}
          </option>  
        ))}
        <option value="0">
          Todos
        </option>
      </select>
  );
};