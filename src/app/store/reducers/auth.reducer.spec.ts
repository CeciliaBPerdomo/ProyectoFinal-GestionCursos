// src/app/store/reducers/auth.reducer.spec.ts
import { authReducerFn } from './auth.reducer';
import { initialAuthState, AuthState } from '../models/auth.model';
import * as AuthActions from '../actions/auth.actions';
import { Usuarios } from '../../models/usuario.model';

describe('AuthReducer', () => {
  let mockUser: Usuarios;

  beforeEach(() => {
    mockUser = {
      id: 1,
      nombre: 'Cecilia Test',
      email: 'test@example.com',
      rol: 'alumno'
    } as Usuarios;
  });

  it('should return the initial state by default', () => {
    const action = { type: 'Unknown' } as any;
    const state = authReducerFn(undefined, action);

    expect(state).toEqual(initialAuthState);
  });

  it('should set isLoading true on login', () => {
  const action = AuthActions.login({
    credentials: { email: 'test@example.com', password: '123456' }
  });
  const state = authReducerFn(initialAuthState, action);

  expect(state.isLoading).toBeTrue();
  expect(state.error).toBeNull();
});

  it('should set user and token on loginSuccess', () => {
    const action = AuthActions.loginSuccess({ user: mockUser, token: 'fake-token' });
    const state = authReducerFn(initialAuthState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe('fake-token');
    expect(state.isLoading).toBeFalse();
    expect(state.isAuthenticated).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should reset user and set error on loginFailure', () => {
    const action = AuthActions.loginFailure({ error: 'Credenciales inválidas' });
    const state = authReducerFn(initialAuthState, action);

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBeFalse();
    expect(state.isLoading).toBeFalse();
    expect(state.error).toBe('Credenciales inválidas');
  });

  it('should reset state on logout', () => {
    const prevState: AuthState = {
      ...initialAuthState,
      user: mockUser,
      token: 'fake-token',
      isAuthenticated: true
    };

    const action = AuthActions.logout();
    const state = authReducerFn(prevState, action);

    expect(state).toEqual(initialAuthState);
  });

  it('should clear error on clearAuthError', () => {
    const prevState: AuthState = {
      ...initialAuthState,
      error: 'Some error'
    };

    const action = AuthActions.clearAuthError();
    const state = authReducerFn(prevState, action);

    expect(state.error).toBeNull();
  });
});
