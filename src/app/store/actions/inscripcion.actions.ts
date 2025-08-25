// store / actions / inscripcion.actions.ts
// Acciones para la gestión de inscripciones
import { createAction, props } from '@ngrx/store';
import { Inscripcion } from '../../models/inscripcion.model';

// Cargar inscripciones
export const loadInscripciones = createAction('[Inscripciones] Load Inscripciones');
export const loadInscripcionesSuccess = createAction(
  '[Inscripciones] Load Inscripciones Success',
  props<{ inscripciones: Inscripcion[] }>()
);
export const loadInscripcionesFailure = createAction(
  '[Inscripciones] Load Inscripciones Failure',
  props<{ error: string }>()
);

// Cargar inscripciones por estado
export const loadInscripcionesByEstado = createAction(
  '[Inscripciones] Load Inscripciones By Estado',
  props<{ estado: string }>()
);
export const loadInscripcionesByEstadoSuccess = createAction(
  '[Inscripciones] Load Inscripciones By Estado Success',
  props<{ inscripciones: Inscripcion[], estado: string }>()
);
export const loadInscripcionesByEstadoFailure = createAction(
  '[Inscripciones] Load Inscripciones By Estado Failure',
  props<{ error: string, estado: string }>()
);

// Cargar inscripciones por alumno
export const loadInscripcionesByAlumno = createAction(
  '[Inscripciones] Load Inscripciones By Alumno',
  props<{ alumnoId: number }>()
);
export const loadInscripcionesByAlumnoSuccess = createAction(
  '[Inscripciones] Load Inscripciones By Alumno Success',
  props<{ inscripciones: Inscripcion[], alumnoId: number }>()
);
export const loadInscripcionesByAlumnoFailure = createAction(
  '[Inscripciones] Load Inscripciones By Alumno Failure',
  props<{ error: string, alumnoId: number }>()
);

// Cargar inscripciones por curso
export const loadInscripcionesByCurso = createAction(
  '[Inscripciones] Load Inscripciones By Curso',
  props<{ cursoId: number }>()
);
export const loadInscripcionesByCursoSuccess = createAction(
  '[Inscripciones] Load Inscripciones By Curso Success',
  props<{ inscripciones: Inscripcion[], cursoId: number }>()
);
export const loadInscripcionesByCursoFailure = createAction(
  '[Inscripciones] Load Inscripciones By Curso Failure',
  props<{ error: string, cursoId: number }>()
);

// Obtener inscripción por ID
export const loadInscripcion = createAction(
  '[Inscripciones] Load Inscripcion',
  props<{ id: number }>()
);
export const loadInscripcionSuccess = createAction(
  '[Inscripciones] Load Inscripcion Success',
  props<{ inscripcion: Inscripcion }>()
);
export const loadInscripcionFailure = createAction(
  '[Inscripciones] Load Inscripcion Failure',
  props<{ error: string }>()
);


// Agregar inscripción
export const addInscripcion = createAction(
  '[Inscripciones] Add Inscripcion',
  props<{ inscripcion: Inscripcion }>()
);
export const addInscripcionSuccess = createAction(
  '[Inscripciones] Add Inscripcion Success',
  props<{ inscripcion: Inscripcion }>()
);
export const addInscripcionFailure = createAction(
  '[Inscripciones] Add Inscripcion Failure',
  props<{ error: string }>()
);

// Actualizar inscripción
export const updateInscripcion = createAction(
  '[Inscripciones] Update Inscripcion',
  props<{ inscripcion: Inscripcion }>()
);
export const updateInscripcionSuccess = createAction(
  '[Inscripciones] Update Inscripcion Success',
  props<{ inscripcion: Inscripcion }>()
);
export const updateInscripcionFailure = createAction(
  '[Inscripciones] Update Inscripcion Failure',
  props<{ error: string }>()
);

// Eliminar inscripción
export const deleteInscripcion = createAction(
  '[Inscripciones] Delete Inscripcion',
  props<{ id: number }>()
);
export const deleteInscripcionSuccess = createAction(
  '[Inscripciones] Delete Inscripcion Success',
  props<{ id: number }>()
);
export const deleteInscripcionFailure = createAction(
  '[Inscripciones] Delete Inscripcion Failure',
  props<{ error: string }>()
);

// Gestión de UI/estado
export const setCurrentInscripcion = createAction(
  '[Inscripciones] Set Current Inscripcion',
  props<{ inscripcion: Inscripcion }>()
);
export const clearCurrentInscripcion = createAction('[Inscripciones] Clear Current Inscripcion');
export const setSearchTermInscripcion = createAction(
  '[Inscripciones] Set Search Term',
  props<{ searchTerm: string }>()
);
export const setFilterByEstado = createAction(
  '[Inscripciones] Set Filter By Estado',
  props<{ estado: string }>()
);
export const setFilterByCurso = createAction(
  '[Inscripciones] Set Filter By Curso',
  props<{ cursoId: number | 'todos' }>()
);
export const setFilterByAlumno = createAction(
  '[Inscripciones] Set Filter By Alumno',
  props<{ alumnoId: number | 'todos' }>()
);
