import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { RoutingConstants } from '../../shared/constants/routing-constants';
import { emailValidator, passwordValidator } from '../../shared/validators/validator';
import { SocialAuthService, GoogleSigninButtonModule, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../../../environments/environment';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';

@Component({
  selector: 'fd-signin',
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule, TooltipDirective],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy  {
  loginForm: FormGroup;
  errorMessage?: string = '';
  environment = environment;
  public isAuthenticated$ = new Subject<boolean>();
  private fbAuthStateSubscription: Subscription = new Subscription();
  isPasswordVisible = false;

  togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
  }
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private facebookService: SocialAuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailValidator]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  ngOnDestroy(): void {
    if (this.fbAuthStateSubscription) {
      this.fbAuthStateSubscription.unsubscribe();
    }
  }

  private subscribeToAuthState(): void {
    this.fbAuthStateSubscription = this.facebookService.authState.pipe(takeUntil(this.isAuthenticated$)).subscribe((user) => {
      if (user) {
        localStorage.setItem("token", JSON.stringify(user));
        this.isAuthenticated$.next(true);
        this.router.navigate([`${RoutingConstants.HOME}`]); 
      } else {
        console.error("Error"); 
        this.isAuthenticated$.next(false);
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
        this.errorMessage = err.error.message || 'Login failed';
      },
    });
  }

  navigateToSignUp() {
    this.router.navigate([`${RoutingConstants.SIGNUP}`]); 
  }
}
