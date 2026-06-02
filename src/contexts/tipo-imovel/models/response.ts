import { TipoImovel } from "./tipo-imovel";

export interface Response {
  type: string;
  count: number;
  tipoImoveis: TipoImovel[];
}