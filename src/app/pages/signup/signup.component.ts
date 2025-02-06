import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { emailValidator, nameValidator, passwordValidator } from '../../shared/validators/validator';

@Component({
  selector: 'fd-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm: FormGroup;
  errorMessage?: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, passwordValidator]]
    });
  }

  onSubmit() {    
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate([`${RoutingConstants.HOME}`]); 
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}
