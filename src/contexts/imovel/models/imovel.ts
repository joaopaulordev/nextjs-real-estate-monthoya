import { Foto } from "./foto";

export interface Imovel {
  id: string;
  descricao: string;
  ativo: boolean;
  lancamento: boolean;
  destaque: boolean;
  valor: number;
  endereco: string;
  visualizacoes: number;
  fotos: Foto[];
}