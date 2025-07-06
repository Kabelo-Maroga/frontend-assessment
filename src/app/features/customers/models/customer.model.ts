import { Address } from "./address.model";
import {Identifiable} from "./identifiable";

export interface Customer extends Identifiable {
  firstName: string;
  lastName: string;
  addresses: Address[];
}
