import { Identifiable } from './identifiable';

export interface Address extends Identifiable {
  street: string;
  city: string;
  suburb?: string;
  postalCode: string;
}
