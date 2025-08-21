import { createReducer, on } from '@ngrx/store';
import * as UsuarioActions from '../actions/usuario.actions';
import { UsuariosState, initialUsuariosState } from '../models/app-state';

export const usuarioReducer = createReducer(
    initialUsuariosState,

    // Cargar todos los usuarios
    on(UsuarioActions.loadUsuarios, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.loadUsuariosSuccess, (state, { usuarios }) => ({
        ...state,
        usuarios,
        usuariosFiltrados: usuarios || [], 
        loading: false,
        error: null
    })),
    on(UsuarioActions.loadUsuariosFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Cargar usuarios por rol
    on(UsuarioActions.loadUsuariosByRol, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.loadUsuariosByRolSuccess, (state, { usuarios, rol }) => ({
        ...state,
        usuariosFiltrados: usuarios,
        filterRol: rol,
        loading: false,
        error: null
    })),
    on(UsuarioActions.loadUsuariosByRolFailure, (state, { error, rol }) => ({
        ...state,
        error,
        loading: false,
        filterRol: rol
    })),

    // Cargar usuario por ID
    on(UsuarioActions.loadUsuario, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.loadUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        currentUsuario: usuario,
        loading: false,
        error: null
    })),
    on(UsuarioActions.loadUsuarioFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
        currentUsuario: null
    })),

    // Agregar usuario
    on(UsuarioActions.addUsuario, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.addUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        usuarios: [...state.usuarios, usuario],
        usuariosFiltrados: state.filterRol === 'todos' || usuario.rol === state.filterRol
            ? [...state.usuariosFiltrados, usuario]
            : state.usuariosFiltrados,
        loading: false,
        error: null
    })),
    on(UsuarioActions.addUsuarioFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Actualizar usuario
    on(UsuarioActions.updateUsuario, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.updateUsuarioSuccess, (state, { usuario }) => {
        const updatedUsuarios = state.usuarios.map(u =>
            u.usuarioId === usuario.usuarioId ? usuario : u
        );

        const updatedUsuariosFiltrados = state.usuariosFiltrados.map(u =>
            u.usuarioId === usuario.usuarioId ? usuario : u
        );

        return {
            ...state,
            usuarios: updatedUsuarios,
            usuariosFiltrados: updatedUsuariosFiltrados,
            currentUsuario: state.currentUsuario?.usuarioId === usuario.usuarioId ? usuario : state.currentUsuario,
            loading: false,
            error: null
        };
    }),
    on(UsuarioActions.updateUsuarioFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Eliminar usuario
    on(UsuarioActions.deleteUsuario, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UsuarioActions.deleteUsuarioSuccess, (state, { id }) => {
        const filteredUsuarios = state.usuarios.filter(u => u.usuarioId !== id);
        const filteredUsuariosFiltrados = state.usuariosFiltrados.filter(u => u.usuarioId !== id);

        return {
            ...state,
            usuarios: filteredUsuarios,
            usuariosFiltrados: filteredUsuariosFiltrados,
            currentUsuario: state.currentUsuario?.usuarioId === id ? null : state.currentUsuario,
            loading: false,
            error: null
        };
    }),
    on(UsuarioActions.deleteUsuarioFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Gestión de UI/estado
    on(UsuarioActions.setCurrentUsuario, (state, { usuario }) => ({
        ...state,
        currentUsuario: usuario
    })),
    on(UsuarioActions.clearCurrentUsuario, (state) => ({
        ...state,
        currentUsuario: null
    })),
    on(UsuarioActions.setSearchTerm, (state, { searchTerm }) => {
        // Si el searchTerm no cambió, no hacer nada
        if (state.searchTerm === searchTerm) return state;

        return {
            ...state,
            searchTerm,
            usuariosFiltrados: state.usuarios.filter(u =>
                u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        };
    }),
    on(UsuarioActions.setFilterByRol, (state, { rol }) => {
        // Si el rol no cambió, no hacer nada
        if (state.filterRol === rol) return state;

        return {
            ...state,
            filterRol: rol,
            usuariosFiltrados: rol === 'todos'
                ? state.usuarios
                : state.usuarios.filter(u => u.rol === rol)
        };
    })
);