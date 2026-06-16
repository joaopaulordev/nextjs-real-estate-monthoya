
export const InputArea = ({ ...props }) => {
    
  return (
    <input 
      type="number" 
      className="border border-gray-300 rounded-md py-1 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue" 
      {...props} 
    />
  )
};