import { createAction, props } from '@ngrx/store';
import { Usuarios } from '../../models/usuario.model';

// Cargar todos los usuarios
export const loadUsuarios = createAction('[Usuarios] Load Usuarios');
export const loadUsuariosSuccess = createAction(
  '[Usuarios] Load Usuarios Success',
  props<{ usuarios: Usuarios[] }>()
);
export const loadUsuariosFailure = createAction(
  '[Usuarios] Load Usuarios Failure',
  props<{ error: string }>()
);

// Cargar usuarios por rol
export const loadUsuariosByRol = createAction(
  '[Usuarios] Load Usuarios By Rol',
  props<{ rol: string }>()
);
export const loadUsuariosByRolSuccess = createAction(
  '[Usuarios] Load Usuarios By Rol Success',
  props<{ usuarios: Usuarios[], rol: string }>()
);
export const loadUsuariosByRolFailure = createAction(
  '[Usuarios] Load Usuarios By Rol Failure',
  props<{ error: string, rol: string }>()
);

// Obtener usuario por ID
export const loadUsuario = createAction(
  '[Usuarios] Load Usuario',
  props<{ id: number }>()
);
export const loadUsuarioSuccess = createAction(
  '[Usuarios] Load Usuario Success',
  props<{ usuario: Usuarios }>()
);
export const loadUsuarioFailure = createAction(
  '[Usuarios] Load Usuario Failure',
  props<{ error: string }>()
);

// Agregar usuario
export const addUsuario = createAction(
  '[Usuarios] Add Usuario',
  props<{ usuario: Usuarios }>()
);
export const addUsuarioSuccess = createAction(
  '[Usuarios] Add Usuario Success',
  props<{ usuario: Usuarios }>()
);
export const addUsuarioFailure = createAction(
  '[Usuarios] Add Usuario Failure',
  props<{ error: string }>()
);

// Actualizar usuario
export const updateUsuario = createAction(
  '[Usuarios] Update Usuario',
  props<{ usuario: Usuarios }>()
);
export const updateUsuarioSuccess = createAction(
  '[Usuarios] Update Usuario Success',
  props<{ usuario: Usuarios }>()
);
export const updateUsuarioFailure = createAction(
  '[Usuarios] Update Usuario Failure',
  props<{ error: string }>()
);

// Eliminar usuario
export const deleteUsuario = createAction(
  '[Usuarios] Delete Usuario',
  props<{ id: number }>()
);
export const deleteUsuarioSuccess = createAction(
  '[Usuarios] Delete Usuario Success',
  props<{ id: number }>()
);
export const deleteUsuarioFailure = createAction(
  '[Usuarios] Delete Usuario Failure',
  props<{ error: string }>()
);

// Acciones para gestión de UI/estado
export const setCurrentUsuario = createAction(
  '[Usuarios] Set Current Usuario',
  props<{ usuario: Usuarios }>()
);
export const clearCurrentUsuario = createAction('[Usuarios] Clear Current Usuario');
export const setSearchTerm = createAction(
  '[Usuarios] Set Search Term',
  props<{ searchTerm: string }>()
);
export const setFilterByRol = createAction(
  '[Usuarios] Set Filter By Rol',
  props<{ rol: string }>()
);

export const clearUsuarios = createAction('[Usuarios] Clear Usuarios');