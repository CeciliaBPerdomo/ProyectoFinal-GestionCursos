import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { reducers } from './store/reducers';

// Effects
import { UsuarioEffects } from './store/effects/usuario.effects';
import { CursoEffects } from './store/effects/curso.effects';
import { InscripcionEffects } from "./store/effects/inscripcion.effects";
import { AuthEffects } from './store/effects/auth.effects';


export const appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    provideStore(reducers),
    provideEffects([UsuarioEffects, CursoEffects, InscripcionEffects, AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};