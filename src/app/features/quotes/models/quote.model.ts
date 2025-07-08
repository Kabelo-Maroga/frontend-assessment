export enum QuoteStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Declined = 'Declined'
}

export interface Quote {
  id: string;
  customerId: string;
  amount: number;
  status: QuoteStatus;
  createdDate: string;
  description: string;
}

//This needs to be refactored. Can probably do with only Quote!
export interface QuoteWithCustomer extends Quote {
  customerFullName: string;
  customer?: any;
}
