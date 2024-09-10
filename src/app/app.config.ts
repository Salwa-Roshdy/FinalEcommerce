import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/header.interceptor';
import { errorsInterceptor } from './core/interceptor/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        errorsInterceptor,
        loadingInterceptor,
      ])
    ),
    provideAnimations(), // ->import any module here or use   importProvidersFrom(BrowserAnimationsModule)  this for owl carsoul
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule ,TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    })),
  ],
  //  withViewTransitions ---> for transition in navbar
};
