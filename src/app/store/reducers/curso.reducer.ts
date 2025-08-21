import { createReducer, on } from '@ngrx/store';
import * as CursoActions from '../actions/curso.actions';
import { CursosState, initialCursosState } from '../models/app-state';

export const cursoReducer = createReducer(
  initialCursosState,
  
  // Cargar todos los cursos
  on(CursoActions.loadCursos, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(CursoActions.loadCursosSuccess, (state, { cursos }) => ({
    ...state,
    cursos,
    cursosFiltrados: cursos,
    loading: false,
    error: null
  })),
  on(CursoActions.loadCursosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Cargar cursos por profesor
  on(CursoActions.loadCursosByProfesor, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(CursoActions.loadCursosByProfesorSuccess, (state, { cursos, profesorId }) => ({
    ...state,
    cursosFiltrados: cursos,
    filterProfesor: profesorId,
    loading: false,
    error: null
  })),
  on(CursoActions.loadCursosByProfesorFailure, (state, { error, profesorId }) => ({
    ...state,
    error,
    loading: false,
    filterProfesor: profesorId
  })),

  // Agregar curso
  on(CursoActions.addCurso, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(CursoActions.addCursoSuccess, (state, { curso }) => ({
    ...state,
    cursos: [...state.cursos, curso],
    cursosFiltrados: state.filterProfesor === 'todos' || curso.profesorId === state.filterProfesor 
      ? [...state.cursosFiltrados, curso] 
      : state.cursosFiltrados,
    loading: false,
    error: null
  })),
  on(CursoActions.addCursoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Eliminar curso
  on(CursoActions.deleteCurso, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(CursoActions.deleteCursoSuccess, (state, { id }) => {
    const filteredCursos = state.cursos.filter(c => c.cursoId !== id);
    const filteredCursosFiltrados = state.cursosFiltrados.filter(c => c.cursoId !== id);

    return {
      ...state,
      cursos: filteredCursos,
      cursosFiltrados: filteredCursosFiltrados,
      currentCurso: state.currentCurso?.cursoId === id ? null : state.currentCurso,
      loading: false,
      error: null
    };
  }),
  on(CursoActions.deleteCursoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Gestión de UI/estado
  on(CursoActions.setSearchTermCurso, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
    cursosFiltrados: state.cursos.filter(curso => 
      curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })),
  on(CursoActions.setFilterByProfesor, (state, { profesorId }) => ({
    ...state,
    filterProfesor: profesorId,
    cursosFiltrados: profesorId === 'todos' 
      ? state.cursos 
      : state.cursos.filter(curso => curso.profesorId === profesorId)
  }))
);