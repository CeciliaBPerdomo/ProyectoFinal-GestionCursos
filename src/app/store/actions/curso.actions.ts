import { createAction, props } from '@ngrx/store';
import { Curso } from '../../models/curso.model';

// Cargar cursos
export const loadCursos = createAction('[Cursos] Load Cursos');
export const loadCursosSuccess = createAction(
  '[Cursos] Load Cursos Success',
  props<{ cursos: Curso[] }>()
);
export const loadCursosFailure = createAction(
  '[Cursos] Load Cursos Failure',
  props<{ error: string }>()
);

// Cargar cursos por profesor
export const loadCursosByProfesor = createAction(
  '[Cursos] Load Cursos By Profesor',
  props<{ profesorId: number }>()
);
export const loadCursosByProfesorSuccess = createAction(
  '[Cursos] Load Cursos By Profesor Success',
  props<{ cursos: Curso[], profesorId: number }>()
);
export const loadCursosByProfesorFailure = createAction(
  '[Cursos] Load Cursos By Profesor Failure',
  props<{ error: string, profesorId: number }>()
);

// Obtener curso por ID
export const loadCurso = createAction(
  '[Cursos] Load Curso',
  props<{ id: number }>()
);
export const loadCursoSuccess = createAction(
  '[Cursos] Load Curso Success',
  props<{ curso: Curso }>()
);
export const loadCursoFailure = createAction(
  '[Cursos] Load Curso Failure',
  props<{ error: string }>()
);

// Agregar curso
export const addCurso = createAction(
  '[Cursos] Add Curso',
  props<{ curso: Curso }>()
);
export const addCursoSuccess = createAction(
  '[Cursos] Add Curso Success',
  props<{ curso: Curso }>()
);
export const addCursoFailure = createAction(
  '[Cursos] Add Curso Failure',
  props<{ error: string }>()
);

// Actualizar curso
export const updateCurso = createAction(
  '[Cursos] Update Curso',
  props<{ curso: Curso }>()
);
export const updateCursoSuccess = createAction(
  '[Cursos] Update Curso Success',
  props<{ curso: Curso }>()
);
export const updateCursoFailure = createAction(
  '[Cursos] Update Curso Failure',
  props<{ error: string }>()
);

// Eliminar curso
export const deleteCurso = createAction(
  '[Cursos] Delete Curso',
  props<{ id: number }>()
);
export const deleteCursoSuccess = createAction(
  '[Cursos] Delete Curso Success',
  props<{ id: number }>()
);
export const deleteCursoFailure = createAction(
  '[Cursos] Delete Curso Failure',
  props<{ error: string }>()
);

// Gestión de UI/estado
export const setCurrentCurso = createAction(
  '[Cursos] Set Current Curso',
  props<{ curso: Curso }>()
);
export const clearCurrentCurso = createAction('[Cursos] Clear Current Curso');
export const setSearchTermCurso = createAction(
  '[Cursos] Set Search Term',
  props<{ searchTerm: string }>()
);
export const setFilterByProfesor = createAction(
  '[Cursos] Set Filter By Profesor',
  props<{ profesorId: number | 'todos' }>()
);