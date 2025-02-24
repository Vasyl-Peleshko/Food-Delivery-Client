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
