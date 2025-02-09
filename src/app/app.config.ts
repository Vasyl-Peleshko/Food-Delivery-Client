import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(`557332738492-v78eq3epkk9fcnl9asl0gicsd9mq374p.apps.googleusercontent.com`,
              {
                oneTapEnabled: false,  
                prompt: "select_account", 
              }
            ),
          },
        ],
        onError: (error) => {
          console.error(error);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('526244792835323')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],  
};
