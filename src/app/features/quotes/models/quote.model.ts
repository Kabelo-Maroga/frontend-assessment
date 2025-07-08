export interface Quote {
  id: string;
  customerId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Declined';
  createdDate: string;
  description: string;
}

//This needs to be refactored. Can probably do with only Quote!
export interface QuoteWithCustomer extends Quote {
  customerFullName: string;
  customer?: any;
}
