import * as AuthActions from './auth.actions';
import { LoginCredentials } from '../models/auth.model';
import { Usuarios } from '../../models/usuario.model';

describe('Auth Actions', () => {

  it('login debería crearse con credentials', () => {
    const credentials: LoginCredentials = { email: 'test@example.com', password: '1234' };
    const action = AuthActions.login({ credentials });
    expect(action.type).toBe('[Auth] Login');
    expect(action.credentials).toEqual(credentials);
  });

  it('loginSuccess debería crearse con user y token', () => {
    const user: Usuarios = {
      usuarioId: 1,
      nombre: 'Juan',
      email: 'juan@example.com',
      password: '1234',
      direccion: 'Calle Falsa 123',
      telefono: '12345678',
      perfil: 'usuario',
      rol: 'alumno',
      inscripciones: []
    };
    const token = 'token123';
    const action = AuthActions.loginSuccess({ user, token });
    expect(action.type).toBe('[Auth] Login Success');
    expect(action.user).toEqual(user);
    expect(action.token).toBe(token);
  });

  it('loginFailure debería crearse con error', () => {
    const error = 'Usuario no encontrado';
    const action = AuthActions.loginFailure({ error });
    expect(action.type).toBe('[Auth] Login Failure');
    expect(action.error).toBe(error);
  });

  it('logout debería crearse correctamente', () => {
    const action = AuthActions.logout();
    expect(action.type).toBe('[Auth] Logout');
  });

  it('clearAuthError debería crearse correctamente', () => {
    const action = AuthActions.clearAuthError();
    expect(action.type).toBe('[Auth] Clear Error');
  });

  it('checkAdminAccess debería crearse correctamente', () => {
    const action = AuthActions.checkAdminAccess();
    expect(action.type).toBe('[Auth] Check Admin Access');
  });

  it('checkTeacherAccess debería crearse correctamente', () => {
    const action = AuthActions.checkTeacherAccess();
    expect(action.type).toBe('[Auth] Check Teacher Access');
  });

  it('checkStudentAccess debería crearse correctamente', () => {
    const action = AuthActions.checkStudentAccess();
    expect(action.type).toBe('[Auth] Check Student Access');
  });

});
