// src/app/store/reducers/inscripcion.reducer.spec.ts
import { inscripcionReducer } from './inscripcion.reducer';
import * as InscripcionActions from '../actions/inscripcion.actions';
import { initialInscripcionesState, InscripcionesState } from '../models/app-state';
import { Inscripcion } from '../../models/inscripcion.model';

describe('Inscripcion Reducer', () => {
  const mockInscripcion: Inscripcion = {
    inscrId: 1,
    cursoId: 101,
    alumnoId: 201,
    fechaInsc: '2025-09-01',
    estado: 'pendiente',
    inscriptorId: 301
  };

  it('debería retornar el estado inicial', () => {
    const state = inscripcionReducer(undefined, { type: '@@init' } as any);
    expect(state).toEqual(initialInscripcionesState);
  });

  it('debería poner loading en true al cargar inscripciones', () => {
    const action = InscripcionActions.loadInscripciones();
    const state = inscripcionReducer(initialInscripcionesState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('debería cargar inscripciones con loadInscripcionesSuccess', () => {
    const action = InscripcionActions.loadInscripcionesSuccess({ inscripciones: [mockInscripcion] });
    const state = inscripcionReducer(initialInscripcionesState, action);

    expect(state.inscripciones.length).toBe(1);
    expect(state.inscripcionesFiltradas.length).toBe(1);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('debería manejar error con loadInscripcionesFailure', () => {
    const error = 'Error cargando inscripciones';
    const action = InscripcionActions.loadInscripcionesFailure({ error });
    const state = inscripcionReducer(initialInscripcionesState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBeFalse();
  });

  it('debería agregar una inscripción con addInscripcionSuccess', () => {
    const action = InscripcionActions.addInscripcionSuccess({ inscripcion: mockInscripcion });
    const state = inscripcionReducer(initialInscripcionesState, action);

    expect(state.inscripciones).toContain(mockInscripcion);
    expect(state.inscripcionesFiltradas).toContain(mockInscripcion);
  });

  it('debería eliminar una inscripción con deleteInscripcionSuccess', () => {
    const populatedState: InscripcionesState = {
      ...initialInscripcionesState,
      inscripciones: [mockInscripcion],
      inscripcionesFiltradas: [mockInscripcion]
    };

    const action = InscripcionActions.deleteInscripcionSuccess({ id: mockInscripcion.inscrId! });
    const state = inscripcionReducer(populatedState, action);

    expect(state.inscripciones.length).toBe(0);
    expect(state.inscripcionesFiltradas.length).toBe(0);
  });

  it('debería filtrar por estado', () => {
    const another: Inscripcion = { ...mockInscripcion, inscrId: 2, estado: 'confirmada' };
    const populatedState: InscripcionesState = {
      ...initialInscripcionesState,
      inscripciones: [mockInscripcion, another],
      inscripcionesFiltradas: [mockInscripcion, another]
    };

    const action = InscripcionActions.setFilterByEstado({ estado: 'pendiente' });
    const state = inscripcionReducer(populatedState, action);

    expect(state.inscripcionesFiltradas.length).toBe(1);
    expect(state.inscripcionesFiltradas[0].estado).toBe('pendiente');
  });

  it('debería filtrar por curso', () => {
    const another: Inscripcion = { ...mockInscripcion, inscrId: 2, cursoId: 202 };
    const populatedState: InscripcionesState = {
      ...initialInscripcionesState,
      inscripciones: [mockInscripcion, another],
      inscripcionesFiltradas: [mockInscripcion, another]
    };

    const action = InscripcionActions.setFilterByCurso({ cursoId: 101 });
    const state = inscripcionReducer(populatedState, action);

    expect(state.inscripcionesFiltradas.length).toBe(1);
    expect(state.inscripcionesFiltradas[0].cursoId).toBe(101);
  });

  it('debería filtrar por alumno', () => {
    const another: Inscripcion = { ...mockInscripcion, inscrId: 2, alumnoId: 202 };
    const populatedState: InscripcionesState = {
      ...initialInscripcionesState,
      inscripciones: [mockInscripcion, another],
      inscripcionesFiltradas: [mockInscripcion, another]
    };

    const action = InscripcionActions.setFilterByAlumno({ alumnoId: 201 });
    const state = inscripcionReducer(populatedState, action);

    expect(state.inscripcionesFiltradas.length).toBe(1);
    expect(state.inscripcionesFiltradas[0].alumnoId).toBe(201);
  });
});
