
interface InputRadioGroupProps {
  title: string;
}

export const InputRadioGroup = ({title, ...props }: InputRadioGroupProps) => {    
  return (
    <div className="w-80 flex flex-col items-stretch justify-center gap-2">
      <span className="text-center text-blue font-semibold">{title}</span>
      <div className="flex gap-1 p-1 max-w-md mx-auto">              
        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 border-gray-200 has-checked:bg-blue">
          <input
            {...props}
            type="radio"
            value="1"
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 peer sr-only"
          />
          <span className="text-sm font-medium text-gray-700 peer-checked:text-white">1+</span>
        </label>

        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 border-gray-200 has-checked:bg-blue">
          <input
            {...props}
            type="radio"
            value="2"
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 peer sr-only"
          />
          <span className="text-sm font-medium text-gray-700 peer-checked:text-white">2+</span>
        </label> 

        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 border-gray-200 has-checked:bg-blue">
          <input
            {...props}
            type="radio"
            value="3"
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 peer sr-only"
          />
          <span className="text-sm font-medium text-gray-700 peer-checked:text-white">3+</span>
        </label>

        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 border-gray-200 has-checked:bg-blue">
          <input
            {...props}
            type="radio"
            value="4"
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 peer sr-only"
          />
          <span className="text-sm font-medium text-gray-700 peer-checked:text-white">4+</span>
        </label>

        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 border rounded-lg hover:bg-gray-50 border-gray-200 has-checked:bg-blue">
          <input
            {...props}
            type="radio"
            value="5"
            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 peer sr-only"
          />
          <span className="text-sm font-medium text-gray-700 peer-checked:text-white">5+</span>
        </label>
      </div>  
    </div>
  )
};