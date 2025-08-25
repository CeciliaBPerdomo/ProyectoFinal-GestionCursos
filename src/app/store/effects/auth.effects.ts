import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from '../actions/auth.actions';
import { Usuarios } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Injectable()

export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);

login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(({ credentials }) =>
      this.authService.login(credentials.email, credentials.password).pipe(
        map(({ user, token }) =>
          AuthActions.loginSuccess({ user, token })
        ),
        catchError(error =>
          of(AuthActions.loginFailure({ error: error.message || 'Error en el login' }))
        )
      )
    )
  )
);

  loginSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => {
        // Redirigir según el rol
        switch (user.rol) {
          case 'administrador':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'profesor':
            this.router.navigate(['/profesores/dashboard-profesores']);
            break;
          case 'alumno':
            this.router.navigate(['/alumnos/dashboard-alumno']);
            break;
          default:
            this.router.navigate(['/']);
        }
      })
    ), 
    { dispatch: false }
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      })
    ), 
    { dispatch: false }
  );

  constructor() {}
}