import { ConfigWhatsaap } from "./config-whatsapp";


export interface ResponseConfigWhatsapp {
  type: string;
  count: number;
  config_whatsapp: ConfigWhatsaap;
}