import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from '../models/app-state';

export const selectCursosState = createFeatureSelector<CursosState>('cursos');

export const selectAllCursos = createSelector(
  selectCursosState,
  (state: CursosState) => state.cursos || []
);

export const selectCursosFiltrados = createSelector(
  selectCursosState,
  (state: CursosState) => state.cursosFiltrados || []
);

export const selectCursoLoading = createSelector(
  selectCursosState,
  (state: CursosState) => state.loading
);

export const selectCursoError = createSelector(
  selectCursosState,
  (state: CursosState) => state.error
);

export const selectFilterProfesor = createSelector(
  selectCursosState,
  (state: CursosState) => state.filterProfesor
);

export const selectSearchTermCurso = createSelector(
  selectCursosState,
  (state: CursosState) => state.searchTerm
);

export const selectCursosStats = createSelector(
  selectAllCursos,
  (cursos) => ({
    total: cursos.length
  })
);
