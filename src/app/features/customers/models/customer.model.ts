import { Address } from "./address.model";

export interface Customer {
  firstName: string;
  lastName: string;
  addresses: Address[];
}
