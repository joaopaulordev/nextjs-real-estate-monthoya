"use client";

import Button from "../../components/button";
import { PlusIcon } from "lucide-react";
import { type Finalidade } from "@/contexts/finalidade/models/finalidade";
import FinalidadeItem from "./finalidade-item";
import React from "react";
import useFinalidades from "@/contexts/finalidade/hooks/use-finalidades";
import InputText from "../../components/input-text";
import ButtonIcon from "../../components/button-icon";
import { X, Check } from 'lucide-react';
import useFinalidadeCreate from "@/contexts/finalidade/hooks/use-finalidade-create";
import { useQueryClient } from '@tanstack/react-query';


export default function FinalidadesAdmin() {
  const queryClient = useQueryClient();
  const { responseFinalidades, isLoadingFinalidades } = useFinalidades(); 
  const [loading, setLoading] = React.useState(false);
  const [finalidadeDescricao, setFinalidadeDescricao] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const { createFinalidade } = useFinalidadeCreate();

  React.useEffect(() => {    
    setLoading(true);        
  }, []);

  function handleAddFinalidade() {   
    setIsEditing(true);
    setFinalidadeDescricao("");
  }

  function handleChangeFinalidadeDescricao(e: React.ChangeEvent<HTMLInputElement>) {
    setFinalidadeDescricao(e.target.value || "");
  }

  function handleExitEditFinalidade() {
    setIsEditing(false);
    setFinalidadeDescricao("");
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); 
    await createFinalidade({ descricao: finalidadeDescricao });    
    setIsEditing(false);
    setFinalidadeDescricao("");
    queryClient.invalidateQueries({ queryKey: ['finalidades'] });
  }

  if (!responseFinalidades) return <p>Loading...</p>; 

  if (!loading) return <p>Carregando...</p>;
  
  return (
    <div className="flex flex-col gap-4">
      <section>
        <Button          
          icon={PlusIcon}
          className="w-full"  
          onClick={handleAddFinalidade}        
          disabled={isEditing}          
        >
          Nova Finalidade
        </Button>
      </section>

      <section className="space-y-2">
        {!isLoadingFinalidades && responseFinalidades.map((finalidade) => <FinalidadeItem key={finalidade.id} finalidade={finalidade} />)}
        {isLoadingFinalidades && (
          <>  
            <FinalidadeItem finalidade={{} as Finalidade} loading />
            <FinalidadeItem finalidade={{} as Finalidade} loading />
            <FinalidadeItem finalidade={{} as Finalidade} loading />
            <FinalidadeItem finalidade={{} as Finalidade} loading />
          </>
        )}
      </section>

      {isEditing && (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4 bg-white p-4 rounded-lg">
          <InputText className="flex-1" value={finalidadeDescricao} onChange={handleChangeFinalidadeDescricao} required autoFocus />
          <div className="flex gap-2">
            <ButtonIcon icon={X} variant="secondary" type="button" onClick={handleExitEditFinalidade} />
            <ButtonIcon icon={Check} variant="primary" type="submit" handling={false} />
          </div>
        </form>
      )}
    </div>
  )
}