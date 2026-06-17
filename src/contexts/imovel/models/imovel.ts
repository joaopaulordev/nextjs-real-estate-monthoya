import { Caracteristica } from "./caracteristica";
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
  vagas_garagem_cobertas: number;
  vagas_garagem_descobertas: number;
  area_construida: number;
  area_total: number;
  sobre_imovel: string;
  fotos: Foto[];
  caracteristicas: Caracteristica[];
}