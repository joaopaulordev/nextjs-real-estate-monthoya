import { Configuracao } from "./configuracao";


export interface Response {
  type: string;
  count: number;
  configuracoes: Configuracao[];
}