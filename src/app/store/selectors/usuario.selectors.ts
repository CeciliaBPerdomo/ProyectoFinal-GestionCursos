// store/selectors/usuario.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuariosState } from '../models/app-state';
import { Usuarios } from '../../models/usuario.model';

export const selectUsuariosState = createFeatureSelector<UsuariosState>('usuarios');

export const selectAllUsuarios = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.usuarios || []
);

export const selectFilterRol = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.filterRol
);

export const selectUsuariosFiltrados = createSelector(
  selectAllUsuarios,
  selectFilterRol,
  (usuarios, rolFiltro) => {
    if (!rolFiltro) return usuarios;
    return usuarios.filter(usuario => usuario.rol === rolFiltro);
  }
);

export const selectUsuarioLoading = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.loading
);

export const selectUsuarioError = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.error
);

export const selectCurrentUsuario = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.currentUsuario
);

export const selectSearchTerm = createSelector(
    selectUsuariosState,
    (state: UsuariosState) => state.searchTerm
);

// Selector para contar usuarios por rol
export const selectUsuariosCountByRol = (rol: string) => createSelector(
    selectAllUsuarios,
    (usuarios) => usuarios.filter(u => u.rol === rol).length
);

// Selector para estadísticas
export const selectUsuariosStats = createSelector(
    selectAllUsuarios,
    (usuarios) => ({
        total: usuarios.length,
        alumnos: usuarios.filter(u => u.rol === 'alumno').length,
        profesores: usuarios.filter(u => u.rol === 'profesor').length,
        administradores: usuarios.filter(u => u.rol === 'administrador').length
    })
);

export const selectAllAlumnos = createSelector(
    selectAllUsuarios,
    (usuarios: Usuarios[]) => usuarios.filter(user => user.rol === 'alumno')
);