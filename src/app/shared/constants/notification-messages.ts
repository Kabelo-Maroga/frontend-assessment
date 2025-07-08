export const SuccessMessages = {
  CUSTOMER_ADDED: 'Customer added successfully',
  CUSTOMER_UPDATED: 'Customer updated successfully',
  CUSTOMER_DELETED: 'Customer deleted successfully',

  QUOTE_ADDED: 'Quote created successfully!',
  QUOTE_UPDATED: 'Quote updated successfully!',
  QUOTE_DELETED: 'Quote deleted successfully!'
};

export const ConfirmMessages = {
  DELETE_CUSTOMER: 'Are you sure you want to delete this customer?',
  DELETE_QUOTE: (customerName: string) => `Are you sure you want to delete the quote for ${customerName}?`
};
