import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';
import { AsyncPipe, CommonModule } from '@angular/common'; 
import { SecondaryCardComponent } from './components/secondary-card/secondary-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';

@Component({
  selector: 'fd-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent, SecondaryCardComponent, CommonModule, AsyncPipe, HomePageComponent, ReactiveFormsModule, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}