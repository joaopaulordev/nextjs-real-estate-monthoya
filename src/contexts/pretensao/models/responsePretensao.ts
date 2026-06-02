import { Pretensao } from "./pretensao";

export interface ResponsePretensao {
  type: string;
  count: number;
  pretensao: Pretensao;
}