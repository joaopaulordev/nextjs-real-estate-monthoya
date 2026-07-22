import React from "react";
import ButtonIcon from "../../components/button-icon";
import Card from "../../components/card";
import Text from "../../components/text";
import Skeleton from "../../components/skeleton";
import InputText from "../../components/input-text";
import { Trash, X, Pencil, Check } from 'lucide-react';
import { type Finalidade } from "@/contexts/finalidade/models/finalidade";
import useFinalidadeUpdate from "@/contexts/finalidade/hooks/use-finalidade-update";
import { useQueryClient } from '@tanstack/react-query';
import useFinalidadeDelete from "@/contexts/finalidade/hooks/use-finalidade-delete";


interface FinalidadeItemProps {
  finalidade: Finalidade;
  loading?: boolean;
}

export default function FinalidadeItem({ finalidade, loading }: FinalidadeItemProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [finalidadeDescricao, setFinalidadeDescricao] = React.useState(finalidade.descricao || "");
  
  const { updateFinalidade } = useFinalidadeUpdate(finalidade.id);
  const { deleteFinalidade } = useFinalidadeDelete();
  
  function handleEditTask() {
    setIsEditing(true);
  } 

  async function handleDeleteTask() {       
    const confirmed = window.confirm("Tem certeza que deseja deletar?");    
    if (confirmed) {      
      await deleteFinalidade(finalidade.id);
      queryClient.invalidateQueries({ queryKey: ['finalidades'] });      
    }    
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault(); 
      await updateFinalidade({ descricao: finalidadeDescricao });    
      setIsEditing(false);
      setFinalidadeDescricao("");
      queryClient.invalidateQueries({ queryKey: ['finalidades'] });
  }

  function handleChangeFinalidadeDescricao(e: React.ChangeEvent<HTMLInputElement>) {
    setFinalidadeDescricao(e.target.value || "");
  }

  function handleExitEditFinalidade() {
    setIsEditing(false);    
  }

  return (     
    <div>
      {!isEditing ? (
        <Card size="md">      
          <div className="flex items-center gap-4">          
            {!loading ? (
              <Text className="flex-1 h-6">
                {finalidade?.descricao}
              </Text>
            ) : (
              <Skeleton className="flex-1" />
            )}
            <div className="flex gap-2">
              <ButtonIcon icon={Trash} variant="tertiary" onClick={() => handleDeleteTask()} loading={loading} handling={false}/>
              <ButtonIcon icon={Pencil} variant="tertiary" onClick={handleEditTask} loading={loading}/>
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4 bg-white p-4 rounded-lg">
          <InputText className="flex-1" value={finalidadeDescricao} onChange={handleChangeFinalidadeDescricao} required autoFocus />
          <div className="flex gap-2">
            <ButtonIcon icon={X} variant="secondary" type="button" onClick={handleExitEditFinalidade} />
            <ButtonIcon icon={Check} variant="primary" type="submit" handling={false} />
          </div>
        </form>
      )}
    </div>   

  );
}