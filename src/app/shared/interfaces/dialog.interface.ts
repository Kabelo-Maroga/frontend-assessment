export interface DialogData<T = any> {
  message: string;
  entity?: T;
  confirmText?: string;
  cancelText?: string;
}

export interface DialogResult {
  confirmed: boolean;
  data?: any;
}
