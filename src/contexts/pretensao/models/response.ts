import { Pretensao } from "./pretensao";

export interface Response {
  type: string;
  count: number;
  pretensoes: Pretensao[];
}