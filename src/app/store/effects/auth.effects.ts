import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as AuthActions from '../actions/auth.actions';
import { Usuarios } from '../../models/usuario.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  // Mock data para las cuentas de demo
  private readonly DEMO_USERS: Usuarios[] = [
    {
      usuarioId: 1,
      email: 'admin@demo.com',
      password: 'admin123',
      nombre: 'Administrador Demo',
      direccion: 'Calle Admin 123',
      telefono: '123456789',
      perfil: 'Administrador del sistema',
      rol: 'administrador'
    },
    {
      usuarioId: 2,
      email: 'profe@demo.com',
      password: 'profe123',
      nombre: 'Profesor Demo',
      direccion: 'Calle Profe 456',
      telefono: '987654321',
      perfil: 'Profesor de Angular',
      rol: 'profesor'
    },
    {
      usuarioId: 3,
      email: 'alumno@demo.com',
      password: 'alumno123',
      nombre: 'Alumno Demo',
      direccion: 'Calle Alumno 789',
      telefono: '555555555',
      perfil: 'Estudiante de ingeniería',
      rol: 'alumno'
    }
  ];

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) => {
        // Simulación de autenticación
        const user = this.DEMO_USERS.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          // Generar token simulado
          const token = btoa(`${user.email}:${Date.now()}`);
          
          // Guardar en localStorage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          return of(AuthActions.loginSuccess({ user, token }));
        } else {
          return of(AuthActions.loginFailure({ 
            error: 'Credenciales inválidas. Use las cuentas de demo proporcionadas.' 
          }));
        }
      }),
      catchError(error => of(AuthActions.loginFailure({ 
        error: 'Error en el servidor. Intente nuevamente.' 
      })))
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