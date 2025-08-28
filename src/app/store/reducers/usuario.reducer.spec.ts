// src/app/store/reducers/usuario.reducer.spec.ts
import { usuarioReducer } from './usuario.reducer';
import * as UsuarioActions from '../actions/usuario.actions';
import { initialUsuariosState } from '../models/app-state';
import { Usuarios } from '../../models/usuario.model';

describe('Usuario Reducer', () => {
  const mockUsuario: Usuarios = {
    usuarioId: 1,
    email: 'test@example.com',
    password: '1234',
    nombre: 'Juan',
    direccion: 'Calle Falsa 123',
    telefono: '099123456',
    perfil: 'perfil1',
    rol: 'alumno',
    inscripciones: []
  };

  it('debería retornar el estado inicial', () => {
    const state = usuarioReducer(undefined, { type: '@@init' } as any);
    expect(state).toEqual(initialUsuariosState);
  });

  it('debería poner loading en true al cargar usuarios', () => {
    const action = UsuarioActions.loadUsuarios();
    const state = usuarioReducer(initialUsuariosState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('debería cargar usuarios con loadUsuariosSuccess', () => {
    const action = UsuarioActions.loadUsuariosSuccess({ usuarios: [mockUsuario] });
    const state = usuarioReducer(initialUsuariosState, action);
    expect(state.usuarios.length).toBe(1);
    expect(state.usuariosFiltrados.length).toBe(1);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('debería manejar error con loadUsuariosFailure', () => {
    const error = 'Error cargando usuarios';
    const action = UsuarioActions.loadUsuariosFailure({ error });
    const state = usuarioReducer(initialUsuariosState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBeFalse();
  });

  it('debería agregar un usuario con addUsuarioSuccess', () => {
    const action = UsuarioActions.addUsuarioSuccess({ usuario: mockUsuario });
    const state = usuarioReducer(initialUsuariosState, action);
    expect(state.usuarios).toContain(mockUsuario);
    expect(state.usuariosFiltrados).toContain(mockUsuario);
  });

  it('debería actualizar un usuario con updateUsuarioSuccess', () => {
    const updatedUsuario = { ...mockUsuario, nombre: 'Juan Updated' };
    const populatedState = { 
      ...initialUsuariosState, 
      usuarios: [mockUsuario], 
      usuariosFiltrados: [mockUsuario], 
      currentUsuario: mockUsuario 
    };
    const action = UsuarioActions.updateUsuarioSuccess({ usuario: updatedUsuario });
    const state = usuarioReducer(populatedState, action);

    expect(state.usuarios[0].nombre).toBe('Juan Updated');
    expect(state.usuariosFiltrados[0].nombre).toBe('Juan Updated');
    expect(state.currentUsuario?.nombre).toBe('Juan Updated');
  });

  it('debería eliminar un usuario con deleteUsuarioSuccess', () => {
    const populatedState = { 
      ...initialUsuariosState, 
      usuarios: [mockUsuario], 
      usuariosFiltrados: [mockUsuario], 
      currentUsuario: mockUsuario 
    };
    const action = UsuarioActions.deleteUsuarioSuccess({ id: mockUsuario.usuarioId! });
    const state = usuarioReducer(populatedState, action);

    expect(state.usuarios.length).toBe(0);
    expect(state.usuariosFiltrados.length).toBe(0);
    expect(state.currentUsuario).toBeNull();
  });

  it('debería filtrar por rol', () => {
    const anotherUsuario = { ...mockUsuario, usuarioId: 2, rol: 'profesor' };
    const populatedState = { 
      ...initialUsuariosState, 
      usuarios: [mockUsuario, anotherUsuario], 
      usuariosFiltrados: [mockUsuario, anotherUsuario] 
    };
    const action = UsuarioActions.setFilterByRol({ rol: 'alumno' });
    const state = usuarioReducer(populatedState, action);

    expect(state.usuariosFiltrados.length).toBe(1);
    expect(state.usuariosFiltrados[0].rol).toBe('alumno');
  });

  it('debería filtrar por searchTerm', () => {
    const anotherUsuario = { ...mockUsuario, usuarioId: 2, nombre: 'Pedro' };
    const populatedState = { 
      ...initialUsuariosState, 
      usuarios: [mockUsuario, anotherUsuario], 
      usuariosFiltrados: [mockUsuario, anotherUsuario] 
    };
    const action = UsuarioActions.setSearchTerm({ searchTerm: 'Pedro' });
    const state = usuarioReducer(populatedState, action);

    expect(state.usuariosFiltrados.length).toBe(1);
    expect(state.usuariosFiltrados[0].nombre).toBe('Pedro');
  });
});
