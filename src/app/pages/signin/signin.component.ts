import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { emailValidator, passwordValidator } from '../../shared/validators/validator';
import { SocialAuthService, GoogleSigninButtonModule, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'fd-signin',
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage?: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private facebookService: SocialAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }
  
  ngOnInit() {
    this.facebookService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  signInWithFB(): void {
    this.facebookService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onEmailPasswordLogin() {    
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([`${RoutingConstants.HOME}`]); 
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}
