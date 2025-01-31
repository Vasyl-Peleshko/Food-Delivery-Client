import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PrimaryCardComponent } from './components/primary-card/primary-card.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent },
  { path: 'test', component: PrimaryCardComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];