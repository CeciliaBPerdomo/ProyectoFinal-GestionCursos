// src/app/store/selectors/auth.selectors.spec.ts
import * as AuthSelectors from './auth.selectors';
import { AuthState } from '../models/auth.model';
import { Usuarios } from '../../models/usuario.model';

describe('Auth Selectors', () => {
  const mockUser: Usuarios = {
    usuarioId: 1,
    email: 'test@example.com',
    password: '1234',
    nombre: 'Juan',
    direccion: 'Calle Falsa 123',
    telefono: '099123456',
    perfil: 'perfil1',
    rol: 'administrador',
    inscripciones: []
  };

  const initialState: { auth: AuthState } = {
    auth: {
      user: mockUser,
      token: '123-token',
      isLoading: true,
      error: 'some error',
      isAuthenticated: true
    }
  };

  it('selectAuthState debería retornar el estado de auth', () => {
    const result = AuthSelectors.selectAuthState.projector(initialState.auth);
    expect(result).toEqual(initialState.auth);
  });

  it('selectUser debería retornar el usuario', () => {
    const result = AuthSelectors.selectUser.projector(initialState.auth);
    expect(result).toEqual(mockUser);
  });

  it('selectUserRole debería retornar el rol del usuario', () => {
    const result = AuthSelectors.selectUserRole.projector(mockUser);
    expect(result).toBe('administrador');
  });

  it('selectIsAdmin debería ser true si el rol es administrador', () => {
    const result = AuthSelectors.selectIsAdmin.projector('administrador');
    expect(result).toBe(true);
  });

  it('selectIsTeacher debería ser true si el rol es profesor', () => {
    const result = AuthSelectors.selectIsTeacher.projector('profesor');
    expect(result).toBe(true);
  });

  it('selectIsStudent debería ser true si el rol es alumno', () => {
    const result = AuthSelectors.selectIsStudent.projector('alumno');
    expect(result).toBe(true);
  });

  it('selectToken debería retornar el token', () => {
    const result = AuthSelectors.selectToken.projector(initialState.auth);
    expect(result).toBe('123-token');
  });

  it('selectIsLoading debería retornar isLoading', () => {
    const result = AuthSelectors.selectIsLoading.projector(initialState.auth);
    expect(result).toBe(true);
  });

  it('selectError debería retornar el error', () => {
    const result = AuthSelectors.selectError.projector(initialState.auth);
    expect(result).toBe('some error');
  });

  it('selectIsAuthenticated debería retornar isAuthenticated', () => {
    const result = AuthSelectors.selectIsAuthenticated.projector(initialState.auth);
    expect(result).toBe(true);
  });

  it('selectUserRole debería retornar null si user es null', () => {
    const result = AuthSelectors.selectUserRole.projector(null);
    expect(result).toBeNull();
  });

  it('selectIsAdmin debería retornar false si rol es null', () => {
    const result = AuthSelectors.selectIsAdmin.projector(null);
    expect(result).toBe(false);
  });
});
