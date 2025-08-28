import * as InscripcionActions from './inscripcion.actions';
import { Inscripcion } from '../../models/inscripcion.model';

describe('Inscripcion Actions', () => {
  const dummyInscripcion: Inscripcion = {
    inscrId: 1,
    cursoId: 101,
    alumnoId: 201,
    fechaInsc: '2025-08-28',
    estado: 'pendiente',
    inscriptorId: 301
  };

  it('loadInscripciones debería crearse sin payload', () => {
    const action = InscripcionActions.loadInscripciones();
    expect(action.type).toBe('[Inscripciones] Load Inscripciones');
  });

  it('loadInscripcionesSuccess debería crearse con inscripciones', () => {
    const action = InscripcionActions.loadInscripcionesSuccess({ inscripciones: [dummyInscripcion] });
    expect(action.type).toBe('[Inscripciones] Load Inscripciones Success');
    expect(action.inscripciones).toEqual([dummyInscripcion]);
  });

  it('loadInscripcionesFailure debería crearse con error', () => {
    const error = 'Error';
    const action = InscripcionActions.loadInscripcionesFailure({ error });
    expect(action.type).toBe('[Inscripciones] Load Inscripciones Failure');
    expect(action.error).toBe(error);
  });

  it('loadInscripcionesByEstado debería crearse con estado', () => {
    const action = InscripcionActions.loadInscripcionesByEstado({ estado: 'pendiente' });
    expect(action.type).toBe('[Inscripciones] Load Inscripciones By Estado');
    expect(action.estado).toBe('pendiente');
  });

  it('loadInscripcionesByEstadoSuccess debería crearse con inscripciones y estado', () => {
    const action = InscripcionActions.loadInscripcionesByEstadoSuccess({ inscripciones: [dummyInscripcion], estado: 'pendiente' });
    expect(action.type).toBe('[Inscripciones] Load Inscripciones By Estado Success');
    expect(action.inscripciones).toEqual([dummyInscripcion]);
    expect(action.estado).toBe('pendiente');
  });

  it('loadInscripcionesByEstadoFailure debería crearse con error y estado', () => {
    const error = 'Error';
    const action = InscripcionActions.loadInscripcionesByEstadoFailure({ error, estado: 'pendiente' });
    expect(action.type).toBe('[Inscripciones] Load Inscripciones By Estado Failure');
    expect(action.error).toBe(error);
    expect(action.estado).toBe('pendiente');
  });

  it('addInscripcion debería crearse con inscripcion', () => {
    const action = InscripcionActions.addInscripcion({ inscripcion: dummyInscripcion });
    expect(action.type).toBe('[Inscripciones] Add Inscripcion');
    expect(action.inscripcion).toEqual(dummyInscripcion);
  });

  it('addInscripcionSuccess debería crearse con inscripcion', () => {
    const action = InscripcionActions.addInscripcionSuccess({ inscripcion: dummyInscripcion });
    expect(action.type).toBe('[Inscripciones] Add Inscripcion Success');
    expect(action.inscripcion).toEqual(dummyInscripcion);
  });

  it('addInscripcionFailure debería crearse con error', () => {
    const error = 'Error';
    const action = InscripcionActions.addInscripcionFailure({ error });
    expect(action.type).toBe('[Inscripciones] Add Inscripcion Failure');
    expect(action.error).toBe(error);
  });

  it('deleteInscripcion debería crearse con id', () => {
    const action = InscripcionActions.deleteInscripcion({ id: 1 });
    expect(action.type).toBe('[Inscripciones] Delete Inscripcion');
    expect(action.id).toBe(1);
  });

  it('deleteInscripcionSuccess debería crearse con id', () => {
    const action = InscripcionActions.deleteInscripcionSuccess({ id: 1 });
    expect(action.type).toBe('[Inscripciones] Delete Inscripcion Success');
    expect(action.id).toBe(1);
  });

  it('deleteInscripcionFailure debería crearse con error', () => {
    const error = 'Error';
    const action = InscripcionActions.deleteInscripcionFailure({ error });
    expect(action.type).toBe('[Inscripciones] Delete Inscripcion Failure');
    expect(action.error).toBe(error);
  });

  it('setCurrentInscripcion debería crearse con inscripcion', () => {
    const action = InscripcionActions.setCurrentInscripcion({ inscripcion: dummyInscripcion });
    expect(action.type).toBe('[Inscripciones] Set Current Inscripcion');
    expect(action.inscripcion).toEqual(dummyInscripcion);
  });

  it('clearCurrentInscripcion debería crearse sin payload', () => {
    const action = InscripcionActions.clearCurrentInscripcion();
    expect(action.type).toBe('[Inscripciones] Clear Current Inscripcion');
  });

  it('setSearchTermInscripcion debería crearse con searchTerm', () => {
    const action = InscripcionActions.setSearchTermInscripcion({ searchTerm: 'Curso 101' });
    expect(action.type).toBe('[Inscripciones] Set Search Term');
    expect(action.searchTerm).toBe('Curso 101');
  });

  it('setFilterByEstado debería crearse con estado', () => {
    const action = InscripcionActions.setFilterByEstado({ estado: 'pendiente' });
    expect(action.type).toBe('[Inscripciones] Set Filter By Estado');
    expect(action.estado).toBe('pendiente');
  });

  it('setFilterByCurso debería crearse con cursoId', () => {
    const action = InscripcionActions.setFilterByCurso({ cursoId: 101 });
    expect(action.type).toBe('[Inscripciones] Set Filter By Curso');
    expect(action.cursoId).toBe(101);
  });

  it('setFilterByAlumno debería crearse con alumnoId', () => {
    const action = InscripcionActions.setFilterByAlumno({ alumnoId: 201 });
    expect(action.type).toBe('[Inscripciones] Set Filter By Alumno');
    expect(action.alumnoId).toBe(201);
  });

  it('setFilterByCurso debería aceptar "todos"', () => {
    const action = InscripcionActions.setFilterByCurso({ cursoId: 'todos' });
    expect(action.type).toBe('[Inscripciones] Set Filter By Curso');
    expect(action.cursoId).toBe('todos');
  });

  it('setFilterByAlumno debería aceptar "todos"', () => {
    const action = InscripcionActions.setFilterByAlumno({ alumnoId: 'todos' });
    expect(action.type).toBe('[Inscripciones] Set Filter By Alumno');
    expect(action.alumnoId).toBe('todos');
  });
});
