import { Finalidade } from "./finalidade";

export interface Response {
  type: string;
  count: number;
  finalidades: Finalidade[];
}