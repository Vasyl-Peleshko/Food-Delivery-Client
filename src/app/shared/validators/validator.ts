import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const emailPattern = /.+@.+\..+/;
  return control.value && !emailPattern.test(control.value) ? { emailInvalid: true } : null;
};

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value || '';

  const errors: ValidationErrors = {};

  if (value.length < 6) {
    errors['minLength'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['uppercaseRequired'] = true;
  }
  if (!/[!@#$%^&*]/.test(value)) {
    errors['specialCharRequired'] = true;
  }

  return Object.keys(errors).length ? errors : null;
};

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    const errors: ValidationErrors = {};
  
    if (value.trim().length < 2) {
      errors['minLength'] = true;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      errors['invalidName'] = true;
    }
  
    return Object.keys(errors).length ? errors : null;
};

export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const phonePattern = /^[0-9]{10}$/;
  return control.value && !phonePattern.test(control.value) ? { phoneInvalid: true } : null;
};

export const cardNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cardPattern = /^\d{4} \d{4} \d{4} \d{4}$/; // Правильний формат
  if (!control.value) return { cardNumberInvalid: true }; // Якщо поле порожнє
  return cardPattern.test(control.value) ? null : { cardNumberInvalid: true };
};

export const expiryDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return control.value && !expiryPattern.test(control.value) ? { expiryInvalid: true } : null;
};

export const cvvValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cvvPattern = /^\d{3,4}$/;
  return control.value && !cvvPattern.test(control.value) ? { cvvInvalid: true } : null;
};
