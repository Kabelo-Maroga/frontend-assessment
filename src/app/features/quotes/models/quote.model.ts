export interface Quote {
  id: string;
  customerId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Declined';
  createdDate: string;
  description: string;
}
