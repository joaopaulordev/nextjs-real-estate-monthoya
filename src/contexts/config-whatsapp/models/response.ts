import { ConfigWhatsaap } from "./config-whatsapp";


export interface Response {
  type: string;
  count: number;
  config_whatsapps: ConfigWhatsaap[];
}