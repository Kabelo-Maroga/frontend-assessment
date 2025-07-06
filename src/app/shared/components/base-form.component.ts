import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseFormComponent {
  abstract form: FormGroup;

  protected markFormAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  protected generateId(prefix: string): string {
    return `${prefix}-${Date.now()}`;
  }

  protected isFormValid(): boolean {
    if (!this.form.valid) {
      this.markFormAsTouched();
      return false;
    }
    return true;
  }
}
