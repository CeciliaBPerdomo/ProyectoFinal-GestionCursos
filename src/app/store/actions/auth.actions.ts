import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../models/usuario.model'
import { LoginCredentials } from '../models/auth.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: Usuarios; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
export const clearAuthError = createAction('[Auth] Clear Error');

// Acciones para verificación de roles
export const checkAdminAccess = createAction('[Auth] Check Admin Access');
export const checkTeacherAccess = createAction('[Auth] Check Teacher Access');
export const checkStudentAccess = createAction('[Auth] Check Student Access');