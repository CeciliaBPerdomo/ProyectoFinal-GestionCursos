import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../models/auth.model';
import * as AuthActions from '../actions/auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isLoading: false,
    isAuthenticated: true,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null
  })),

  on(AuthActions.logout, (): AuthState => initialAuthState),

  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null
  }))
);

// Función de reducer alternativa para compatibilidad
export function authReducerFn(state: AuthState = initialAuthState, action: any): AuthState {
  return authReducer(state, action);
}