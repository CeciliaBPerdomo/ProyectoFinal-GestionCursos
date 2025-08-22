import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, initialAuthState  } from '../models/auth.model';
import { AppState } from '../models/app-state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state?.user || null
);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.rol || null
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'administrador'
);

export const selectIsTeacher = createSelector(
  selectUserRole,
  (role) => role === 'profesor'
);

export const selectIsStudent = createSelector(
  selectUserRole,
  (role) => role === 'alumno'
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state?.token || null
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state?.isLoading || false
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state?.error || null
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state?.isAuthenticated || false
);