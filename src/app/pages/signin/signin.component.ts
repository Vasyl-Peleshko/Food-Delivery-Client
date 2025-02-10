import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { emailValidator, passwordValidator } from '../../shared/validators/validator';
import { SocialAuthService, GoogleSigninButtonModule, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../../../environments/environment';
import { handleOauthResponse, OAuthResponse } from '../../shared/utils/auth-helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fd-signin',
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit, OnDestroy  {
  loginForm: FormGroup;
  errorMessage?: string = '';
  environment = environment;
  private fbAuthStateSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private facebookService: SocialAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }
  
  ngOnInit() {
    (window as unknown as { handleOauthResponse: (response: OAuthResponse) => void }).handleOauthResponse = handleOauthResponse;
  }

  ngOnDestroy(): void {
    if (this.fbAuthStateSubscription) {
      this.fbAuthStateSubscription.unsubscribe();
    }
  }

  private subscribeToAuthState(): void {
    this.fbAuthStateSubscription = this.facebookService.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        localStorage.setItem("token", JSON.stringify(user));
        this.router.navigate([`${RoutingConstants.HOME}`]); 
      } else {
        console.error("Error"); 
      }
    });
  }

  signInWithFB(): void {
    this.subscribeToAuthState();
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
