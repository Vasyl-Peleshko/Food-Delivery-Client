import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { AsyncPipe, CommonModule } from '@angular/common'; 
import { SecondaryCardComponent } from './components/secondary-card/secondary-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingService } from './shared/services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent, SecondaryCardComponent, CommonModule, AsyncPipe, HomePageComponent, ReactiveFormsModule, SignupComponent, MatProgressBarModule, MatSnackBarModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  loading?: boolean = false;

  constructor(
    private _loadingService: LoadingService,
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
