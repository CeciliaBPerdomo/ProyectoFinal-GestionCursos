import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import * as AuthActions from '../../store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Usuarios } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { hot, cold } from 'jasmine-marbles';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const dummyUser: Usuarios = {
    usuarioId: 1,
    nombre: 'Juan Perez',
    email: 'juan@example.com',
    password: '1234',
    direccion: 'Calle Falsa 123',
    telefono: '099123456',
    perfil: 'estudiante',
    rol: 'alumno',
    inscripciones: []
  };

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('login$ should return loginSuccess on successful login', () => {
    const credentials = { email: 'juan@example.com', password: '1234' };
    const action = AuthActions.login({ credentials });
    const outcome = AuthActions.loginSuccess({ user: dummyUser, token: 'token123' });

    actions$ = hot('-a', { a: action });
    authService.login.and.returnValue(cold('-b|', { b: { user: dummyUser, token: 'token123' } }));

    const expected = cold('--c', { c: outcome });
    expect(effects.login$).toBeObservable(expected);
  });

  it('login$ should return loginFailure on login error', () => {
    const credentials = { email: 'juan@example.com', password: '1234' };
    const action = AuthActions.login({ credentials });
    const error = new Error('Usuario no encontrado');
    const outcome = AuthActions.loginFailure({ error: 'Usuario no encontrado' });

    actions$ = hot('-a', { a: action });
    authService.login.and.returnValue(cold('-#|', {}, error));

    const expected = cold('--c', { c: outcome });
    expect(effects.login$).toBeObservable(expected);
  });

  it('loginSuccess$ should navigate to alumno dashboard', (done) => {
    const action = AuthActions.loginSuccess({ user: dummyUser, token: 'token123' });
    actions$ = of(action);

    effects.loginSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/alumnos/dashboard-alumno']);
      done();
    });
  });

  it('logout$ should clear localStorage and navigate to login', (done) => {
    spyOn(localStorage, 'removeItem');
    const action = AuthActions.logout();
    actions$ = of(action);

    effects.logout$.subscribe(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
