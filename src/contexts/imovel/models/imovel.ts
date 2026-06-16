import { Foto } from "./foto";

export interface Imovel {
  id: string;
  descricao: string;
  ativo: boolean;
  lancamento: boolean;
  destaque: boolean;
  pretensao: number;
  tipo_imovel: number;
  valor: number;
  endereco: string;
  visualizacoes: number;
  dormitorios: number;
  banheiros: number;
  suites: number;
  vagas_garagem: number;
  fotos: Foto[];
}