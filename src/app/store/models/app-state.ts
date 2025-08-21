import { Usuarios } from '../../models/usuario.model';

export interface AppState {
    usuarios: UsuariosState;
}

export interface UsuariosState {
    usuarios: Usuarios[];
    usuariosFiltrados: Usuarios[];
    currentUsuario: Usuarios | null;
    error: string | null;
    loading: boolean;
    searchTerm: string;
    filterRol: string; // 'todos', 'alumno', 'profesor', 'administrador'
}

export const initialUsuariosState: UsuariosState = {
  usuarios: [],
  usuariosFiltrados: [],
  currentUsuario: null,
  error: null,
  loading: false,
  searchTerm: '',
  filterRol: 'todos'
};