import * as CursoActions from './curso.actions';
import { Curso } from '../../models/curso.model';

describe('Curso Actions', () => {
  const dummyCurso: Curso = {
    id: 1,
    cursoId: 1,
    nombre: 'Curso Test',
    profesorId: 10,
    descripcion: 'Descripción',
    cantHoras: '10',
    cantClases: '5',
    comienzo: '2025-09-01',
    fin: '2025-12-01'
  };

  it('loadCursos debería crearse sin payload', () => {
    const action = CursoActions.loadCursos();
    expect(action.type).toBe('[Cursos] Load Cursos');
  });

  it('loadCursosSuccess debería crearse con cursos', () => {
    const action = CursoActions.loadCursosSuccess({ cursos: [dummyCurso] });
    expect(action.type).toBe('[Cursos] Load Cursos Success');
    expect(action.cursos).toEqual([dummyCurso]);
  });

  it('loadCursosFailure debería crearse con error', () => {
    const error = 'Error al cargar cursos';
    const action = CursoActions.loadCursosFailure({ error });
    expect(action.type).toBe('[Cursos] Load Cursos Failure');
    expect(action.error).toBe(error);
  });

  it('loadCursosByProfesor debería crearse con profesorId', () => {
    const action = CursoActions.loadCursosByProfesor({ profesorId: 10 });
    expect(action.type).toBe('[Cursos] Load Cursos By Profesor');
    expect(action.profesorId).toBe(10);
  });

  it('loadCursosByProfesorSuccess debería crearse con cursos y profesorId', () => {
    const action = CursoActions.loadCursosByProfesorSuccess({ cursos: [dummyCurso], profesorId: 10 });
    expect(action.type).toBe('[Cursos] Load Cursos By Profesor Success');
    expect(action.cursos).toEqual([dummyCurso]);
    expect(action.profesorId).toBe(10);
  });

  it('loadCursosByProfesorFailure debería crearse con error y profesorId', () => {
    const error = 'Error';
    const action = CursoActions.loadCursosByProfesorFailure({ error, profesorId: 10 });
    expect(action.type).toBe('[Cursos] Load Cursos By Profesor Failure');
    expect(action.error).toBe(error);
    expect(action.profesorId).toBe(10);
  });

  it('loadCurso debería crearse con id', () => {
    const action = CursoActions.loadCurso({ id: 1 });
    expect(action.type).toBe('[Cursos] Load Curso');
    expect(action.id).toBe(1);
  });

  it('loadCursoSuccess debería crearse con curso', () => {
    const action = CursoActions.loadCursoSuccess({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Load Curso Success');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('loadCursoFailure debería crearse con error', () => {
    const error = 'Error';
    const action = CursoActions.loadCursoFailure({ error });
    expect(action.type).toBe('[Cursos] Load Curso Failure');
    expect(action.error).toBe(error);
  });

  it('addCurso debería crearse con curso', () => {
    const action = CursoActions.addCurso({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Add Curso');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('addCursoSuccess debería crearse con curso', () => {
    const action = CursoActions.addCursoSuccess({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Add Curso Success');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('addCursoFailure debería crearse con error', () => {
    const error = 'Error';
    const action = CursoActions.addCursoFailure({ error });
    expect(action.type).toBe('[Cursos] Add Curso Failure');
    expect(action.error).toBe(error);
  });

  it('updateCurso debería crearse con curso', () => {
    const action = CursoActions.updateCurso({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Update Curso');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('updateCursoSuccess debería crearse con curso', () => {
    const action = CursoActions.updateCursoSuccess({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Update Curso Success');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('updateCursoFailure debería crearse con error', () => {
    const error = 'Error';
    const action = CursoActions.updateCursoFailure({ error });
    expect(action.type).toBe('[Cursos] Update Curso Failure');
    expect(action.error).toBe(error);
  });

  it('deleteCurso debería crearse con id', () => {
    const action = CursoActions.deleteCurso({ id: 1 });
    expect(action.type).toBe('[Cursos] Delete Curso');
    expect(action.id).toBe(1);
  });

  it('deleteCursoSuccess debería crearse con id', () => {
    const action = CursoActions.deleteCursoSuccess({ id: 1 });
    expect(action.type).toBe('[Cursos] Delete Curso Success');
    expect(action.id).toBe(1);
  });

  it('deleteCursoFailure debería crearse con error', () => {
    const error = 'Error';
    const action = CursoActions.deleteCursoFailure({ error });
    expect(action.type).toBe('[Cursos] Delete Curso Failure');
    expect(action.error).toBe(error);
  });

  it('setCurrentCurso debería crearse con curso', () => {
    const action = CursoActions.setCurrentCurso({ curso: dummyCurso });
    expect(action.type).toBe('[Cursos] Set Current Curso');
    expect(action.curso).toEqual(dummyCurso);
  });

  it('clearCurrentCurso debería crearse sin payload', () => {
    const action = CursoActions.clearCurrentCurso();
    expect(action.type).toBe('[Cursos] Clear Current Curso');
  });

  it('setSearchTermCurso debería crearse con searchTerm', () => {
    const action = CursoActions.setSearchTermCurso({ searchTerm: 'Angular' });
    expect(action.type).toBe('[Cursos] Set Search Term');
    expect(action.searchTerm).toBe('Angular');
  });

  it('setFilterByProfesor debería crearse con profesorId', () => {
    const action = CursoActions.setFilterByProfesor({ profesorId: 10 });
    expect(action.type).toBe('[Cursos] Set Filter By Profesor');
    expect(action.profesorId).toBe(10);
  });

  it('setFilterByProfesor debería aceptar "todos"', () => {
    const action = CursoActions.setFilterByProfesor({ profesorId: 'todos' });
    expect(action.type).toBe('[Cursos] Set Filter By Profesor');
    expect(action.profesorId).toBe('todos');
  });
});
