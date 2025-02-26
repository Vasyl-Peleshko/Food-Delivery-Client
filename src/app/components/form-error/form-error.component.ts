import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'fd-form-error',
  template: `  <div *ngIf="control?.invalid && control?.touched" class="text-red-500 text-sm">
    <span *ngIf="control?.errors?.['required']">{{ fieldName }} is required.</span>
    <span *ngIf="control?.errors?.['emailInvalid']">Invalid email format.</span>
    <span *ngIf="control?.errors?.['phoneInvalid']">Invalid phone number format.</span>
    <span *ngIf="control?.errors?.['minLength']">{{ fieldName }} must be at least 2 characters long.</span>
    <span *ngIf="control?.errors?.['invalidName']">Only letters and spaces are allowed.</span>
    <span *ngIf="control?.errors?.['uppercaseRequired']">Must contain at least one uppercase letter.</span>
    <span *ngIf="control?.errors?.['specialCharRequired']">Must contain at least one special character.</span>
    <span *ngIf="control?.errors?.['cardNumberInvalid']">Invalid card number format (XXXX XXXX XXXX XXXX).</span>
    <span *ngIf="control?.errors?.['cvvInvalid']">CVV must be 3 or 4 digits.</span>
    <span *ngIf="control?.errors?.['expiryInvalid']">Invalid expiry format (MM/YY).</span>
  </div>
`,
  standalone: true,
  imports: [CommonModule]
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() fieldName = 'Field';
}
