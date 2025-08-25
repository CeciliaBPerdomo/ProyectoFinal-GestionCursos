// store/selectors/inscripciones.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InscripcionesState } from '../models/app-state';

// Feature principal
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

// ✅ Selector para estadísticas globales
export const selectInscripcionesStats = createSelector(
  selectAllInscripciones,
  (inscripciones) => {
    const total = inscripciones.length;
    const activos = inscripciones.filter(i => i.estado === 'activa').length;
    return { total, activos };
  }
);

// ✅ Selector PARAMETRIZADO por alumnoId
export const selectInscripcionesStatsPorAlumno = (alumnoId: number) => createSelector(
  selectInscripcionesFiltradas,
  (inscripciones) => {
    if (!alumnoId) {
      return { total: 0, activos: 0, finalizados: 0, cancelados: 0 };
    }

    const inscripcionesAlumno = inscripciones.filter(i => Number(i.alumnoId) === alumnoId);

    return {
      total: inscripcionesAlumno.length,
      activos: inscripcionesAlumno.filter(i => i.estado === 'activa').length,
      finalizados: inscripcionesAlumno.filter(i => i.estado === 'finalizada').length,
      cancelados: inscripcionesAlumno.filter(i => i.estado === 'cancelada').length
    };
  }
);
