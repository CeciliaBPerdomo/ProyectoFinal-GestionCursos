import { Usuarios } from '../../models/usuario.model';
import { Curso } from '../../models/curso.model';

export interface AppState {
    usuarios: UsuariosState;
    cursos: CursosState;
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


// Cursos 
export interface CursosState {
  cursos: Curso[];
  cursosFiltrados: Curso[];
  currentCurso: Curso | null;
  error: string | null;
  loading: boolean;
  filterProfesor: number | 'todos';
  searchTerm: string;
}

export const initialCursosState: CursosState = {
  cursos: [],
  cursosFiltrados: [],
  currentCurso: null,
  error: null,
  loading: false,
  filterProfesor: 'todos',
  searchTerm: ''
};