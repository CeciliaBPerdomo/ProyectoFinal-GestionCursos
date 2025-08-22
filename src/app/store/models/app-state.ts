// store / models / app-state.ts
import { Usuarios } from '../../models/usuario.model';
import { Curso } from '../../models/curso.model';
import { Inscripcion } from '../../models/inscripcion.model';

export interface AppState {
    usuarios: UsuariosState;
    cursos: CursosState;
    inscripciones: InscripcionesState;
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

// Inscripciones 
export interface InscripcionesState {
  inscripciones: Inscripcion[];
  inscripcionesFiltradas: Inscripcion[];
  currentInscripcion: Inscripcion | null;
  error: string | null;
  loading: boolean;
  filterEstado: string;
  filterCurso: number | 'todos';
  filterAlumno: number | 'todos';
  searchTerm: string;
}

export const initialInscripcionesState: InscripcionesState = {
  inscripciones: [],
  inscripcionesFiltradas: [],
  currentInscripcion: null,
  error: null,
  loading: false,
  filterEstado: 'todos',
  filterCurso: 'todos',
  filterAlumno: 'todos',
  searchTerm: ''
};