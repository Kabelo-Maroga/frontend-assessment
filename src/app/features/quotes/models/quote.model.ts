export interface Quote {
  id: string;
  customerId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Declined';
  createdDate: string;
  description: string;
}

export interface QuoteWithCustomer extends Quote {
  customerFullName: string;
  customer?: any; // Customer object for additional data
}
