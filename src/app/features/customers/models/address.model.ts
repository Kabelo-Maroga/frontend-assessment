import { Identifiable } from './identifiable';

export interface Address extends Identifiable {
  street: string;
  city: string;
  suburb?: string; // Optional since not all addresses have suburbs
  postalCode: string;
}
