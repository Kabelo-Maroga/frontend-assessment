import { Customer } from "./customer.model";

export interface CustomerFormData {
  customer?: Customer;
  isEdit?: boolean;
}
