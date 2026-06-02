import { Finalidade } from "./finalidade";

export interface ResponseFinalidade {
  type: string;
  count: number;
  finalidade: Finalidade;
}