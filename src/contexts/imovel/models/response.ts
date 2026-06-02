import { Imovel } from "./imovel";

export interface Response {
  type: string;
  count: number;
  imoveis: Imovel[];
}