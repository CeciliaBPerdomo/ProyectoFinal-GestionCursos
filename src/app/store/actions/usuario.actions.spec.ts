import * as UsuarioActions from './usuario.actions';
import { Usuarios } from '../../models/usuario.model';

describe('Usuario Actions', () => {
  const dummyUsuario: Usuarios = {
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

  it('loadUsuarios debería crearse sin payload', () => {
    const action = UsuarioActions.loadUsuarios();
    expect(action.type).toBe('[Usuarios] Load Usuarios');
  });

  it('loadUsuariosSuccess debería crearse con usuarios', () => {
    const action = UsuarioActions.loadUsuariosSuccess({ usuarios: [dummyUsuario] });
    expect(action.type).toBe('[Usuarios] Load Usuarios Success');
    expect(action.usuarios).toEqual([dummyUsuario]);
  });

  it('loadUsuariosFailure debería crearse con error', () => {
    const error = 'Error';
    const action = UsuarioActions.loadUsuariosFailure({ error });
    expect(action.type).toBe('[Usuarios] Load Usuarios Failure');
    expect(action.error).toBe(error);
  });

  it('loadUsuariosByRol debería crearse con rol', () => {
    const action = UsuarioActions.loadUsuariosByRol({ rol: 'profesor' });
    expect(action.type).toBe('[Usuarios] Load Usuarios By Rol');
    expect(action.rol).toBe('profesor');
  });

  it('loadUsuariosByRolSuccess debería crearse con usuarios y rol', () => {
    const action = UsuarioActions.loadUsuariosByRolSuccess({ usuarios: [dummyUsuario], rol: 'profesor' });
    expect(action.type).toBe('[Usuarios] Load Usuarios By Rol Success');
    expect(action.usuarios).toEqual([dummyUsuario]);
    expect(action.rol).toBe('profesor');
  });

  it('loadUsuariosByRolFailure debería crearse con error y rol', () => {
    const error = 'Error';
    const action = UsuarioActions.loadUsuariosByRolFailure({ error, rol: 'profesor' });
    expect(action.type).toBe('[Usuarios] Load Usuarios By Rol Failure');
    expect(action.error).toBe(error);
    expect(action.rol).toBe('profesor');
  });

  it('addUsuario debería crearse con usuario', () => {
    const action = UsuarioActions.addUsuario({ usuario: dummyUsuario });
    expect(action.type).toBe('[Usuarios] Add Usuario');
    expect(action.usuario).toEqual(dummyUsuario);
  });

  it('addUsuarioSuccess debería crearse con usuario', () => {
    const action = UsuarioActions.addUsuarioSuccess({ usuario: dummyUsuario });
    expect(action.type).toBe('[Usuarios] Add Usuario Success');
    expect(action.usuario).toEqual(dummyUsuario);
  });

  it('addUsuarioFailure debería crearse con error', () => {
    const error = 'Error';
    const action = UsuarioActions.addUsuarioFailure({ error });
    expect(action.type).toBe('[Usuarios] Add Usuario Failure');
    expect(action.error).toBe(error);
  });

  it('deleteUsuario debería crearse con id', () => {
    const action = UsuarioActions.deleteUsuario({ id: 1 });
    expect(action.type).toBe('[Usuarios] Delete Usuario');
    expect(action.id).toBe(1);
  });

  it('deleteUsuarioSuccess debería crearse con id', () => {
    const action = UsuarioActions.deleteUsuarioSuccess({ id: 1 });
    expect(action.type).toBe('[Usuarios] Delete Usuario Success');
    expect(action.id).toBe(1);
  });

  it('deleteUsuarioFailure debería crearse con error', () => {
    const error = 'Error';
    const action = UsuarioActions.deleteUsuarioFailure({ error });
    expect(action.type).toBe('[Usuarios] Delete Usuario Failure');
    expect(action.error).toBe(error);
  });

  it('setCurrentUsuario debería crearse con usuario', () => {
    const action = UsuarioActions.setCurrentUsuario({ usuario: dummyUsuario });
    expect(action.type).toBe('[Usuarios] Set Current Usuario');
    expect(action.usuario).toEqual(dummyUsuario);
  });

  it('clearCurrentUsuario debería crearse sin payload', () => {
    const action = UsuarioActions.clearCurrentUsuario();
    expect(action.type).toBe('[Usuarios] Clear Current Usuario');
  });

  it('setSearchTerm debería crearse con searchTerm', () => {
    const action = UsuarioActions.setSearchTerm({ searchTerm: 'Juan' });
    expect(action.type).toBe('[Usuarios] Set Search Term');
    expect(action.searchTerm).toBe('Juan');
  });

  it('setFilterByRol debería crearse con rol', () => {
    const action = UsuarioActions.setFilterByRol({ rol: 'alumno' });
    expect(action.type).toBe('[Usuarios] Set Filter By Rol');
    expect(action.rol).toBe('alumno');
  });

  it('clearUsuarios debería crearse sin payload', () => {
    const action = UsuarioActions.clearUsuarios();
    expect(action.type).toBe('[Usuarios] Clear Usuarios');
  });
});
