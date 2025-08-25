// store / selectors / inscripciones.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionesState } from '../models/app-state';

export const selectInscripcionesState = createFeatureSelector<InscripcionesState>('inscripciones');

export const selectAllInscripciones = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.inscripciones || []
);

export const selectInscripcionesFiltradas = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.inscripcionesFiltradas || []
);

export const selectInscripcionLoading = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.loading
);

export const selectInscripcionError = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.error
);

export const selectFilterEstado = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.filterEstado
);

export const selectFilterCurso = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.filterCurso
);

export const selectFilterAlumno = createSelector(
  selectInscripcionesState,
  (state: InscripcionesState) => state.filterAlumno
);

// Selector para estadísticas de inscripciones
export const selectInscripcionesStats = createSelector(
  selectAllInscripciones,
  (inscripciones) => ({
    total: inscripciones.length
  })
);
