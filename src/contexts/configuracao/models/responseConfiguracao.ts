import { Configuracao } from "./configuracao";


export interface ResponseConfiguracao {
  type: string;
  count: number;
  configuracao: Configuracao;
}