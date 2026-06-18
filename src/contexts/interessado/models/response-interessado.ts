import { Interessado } from "./interessado";

export interface ResponseInteressado {
  type: string;
  count: number;
  interessado: Interessado;
}