// store / reducers / inscripcion.reducers.ts
import { createReducer, on } from '@ngrx/store';
import * as InscripcionActions from '../actions/inscripcion.actions';
import { InscripcionesState, initialInscripcionesState } from '../models/app-state';

export const inscripcionReducer = createReducer(
  initialInscripcionesState,
  
  // Cargar todas las inscripciones
  on(InscripcionActions.loadInscripciones, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(InscripcionActions.loadInscripcionesSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,
    inscripcionesFiltradas: inscripciones,
    loading: false,
    error: null
  })),
  on(InscripcionActions.loadInscripcionesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Cargar inscripciones por estado
  on(InscripcionActions.loadInscripcionesByEstado, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(InscripcionActions.loadInscripcionesByEstadoSuccess, (state, { inscripciones, estado }) => ({
    ...state,
    inscripcionesFiltradas: inscripciones,
    filterEstado: estado,
    loading: false,
    error: null
  })),
  on(InscripcionActions.loadInscripcionesByEstadoFailure, (state, { error, estado }) => ({
    ...state,
    error,
    loading: false,
    filterEstado: estado
  })),

  // Agregar inscripción
  on(InscripcionActions.addInscripcion, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(InscripcionActions.addInscripcionSuccess, (state, { inscripcion }) => ({
    ...state,
    inscripciones: [...state.inscripciones, inscripcion],
    inscripcionesFiltradas: [...state.inscripcionesFiltradas, inscripcion],
    loading: false,
    error: null
  })),
  on(InscripcionActions.addInscripcionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Eliminar inscripción
  on(InscripcionActions.deleteInscripcion, (state) => ({ 
    ...state, 
    loading: true,
    error: null
  })),
  on(InscripcionActions.deleteInscripcionSuccess, (state, { id }) => {
    const filteredInscripciones = state.inscripciones.filter(i => i.inscrId !== id);
    const filteredInscripcionesFiltradas = state.inscripcionesFiltradas.filter(i => i.inscrId !== id);

    return {
      ...state,
      inscripciones: filteredInscripciones,
      inscripcionesFiltradas: filteredInscripcionesFiltradas,
      currentInscripcion: state.currentInscripcion?.inscrId === id ? null : state.currentInscripcion,
      loading: false,
      error: null
    };
  }),
  on(InscripcionActions.deleteInscripcionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Gestión de filtros
  on(InscripcionActions.setFilterByEstado, (state, { estado }) => ({
    ...state,
    filterEstado: estado,
    inscripcionesFiltradas: estado === 'todos' 
      ? state.inscripciones 
      : state.inscripciones.filter(i => i.estado === estado)
  })),
  on(InscripcionActions.setFilterByCurso, (state, { cursoId }) => ({
    ...state,
    filterCurso: cursoId,
    inscripcionesFiltradas: cursoId === 'todos' 
      ? state.inscripciones 
      : state.inscripciones.filter(i => i.cursoId === cursoId)
  })),
  on(InscripcionActions.setFilterByAlumno, (state, { alumnoId }) => ({
    ...state,
    filterAlumno: alumnoId,
    inscripcionesFiltradas: alumnoId === 'todos' 
      ? state.inscripciones 
      : state.inscripciones.filter(i => i.alumnoId === alumnoId)
  })),

  // Cargar inscripciones por alumno
  on(InscripcionActions.loadInscripcionesByAlumnoSuccess, (state, { inscripciones }) => ({
    ...state,
    inscripciones,              
    inscripcionesFiltradas: inscripciones,
    loading: false,
    error: null
  })),
  on(InscripcionActions.loadInscripcionesByAlumnoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
