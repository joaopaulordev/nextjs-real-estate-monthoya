import { Imovel } from "./imovel";

export interface ResponseImovelView {
  type: string;
  count: number;
  imovel: Imovel;
}