import { cursoReducer } from './curso.reducer';
import * as CursoActions from '../actions/curso.actions';
import { initialCursosState } from '../models/app-state';
import { Curso } from '../../models/curso.model';

describe('Curso Reducer', () => {
  const mockCursos: Curso[] = [
    {
      cursoId: 1,
      nombre: 'Angular Básico',
      descripcion: 'Curso de introducción a Angular',
      profesorId: 101,
      cantHoras: "20",
      cantClases: "10",
      comienzo: '2025-09-01',
      fin: '2025-12-01',
    },
    {
      cursoId: 2,
      nombre: 'React Intermedio',
      descripcion: 'Curso para aprender React con proyectos',
      profesorId: 102,
      cantHoras: "25",
      cantClases: "12",
      comienzo: '2025-10-01',
      fin: '2026-01-01',
    }
  ];

  it('debería manejar loadCursosSuccess', () => {
    const action = CursoActions.loadCursosSuccess({ cursos: mockCursos });
    const state = cursoReducer(initialCursosState, action);

    expect(state.cursos.length).toBe(2);
    expect(state.cursosFiltrados.length).toBe(2);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('debería manejar addCursoSuccess', () => {
    const nuevoCurso: Curso = {
      cursoId: 3,
      nombre: 'Vue Avanzado',
      descripcion: 'Curso avanzado de Vue',
      profesorId: 103,
      cantHoras: "30",
      cantClases: "15",
      comienzo: '2025-11-01',
      fin: '2026-02-01',
    };

    const action = CursoActions.addCursoSuccess({ curso: nuevoCurso });
    const state = cursoReducer(
      { ...initialCursosState, cursos: mockCursos, cursosFiltrados: mockCursos },
      action
    );

    expect(state.cursos.length).toBe(3);
    expect(state.cursos.find(c => c.cursoId === 3)).toEqual(nuevoCurso);
  });

  it('debería manejar deleteCursoSuccess', () => {
    const action = CursoActions.deleteCursoSuccess({ id: 1 });
    const state = cursoReducer(
      { ...initialCursosState, cursos: mockCursos, cursosFiltrados: mockCursos },
      action
    );

    expect(state.cursos.length).toBe(1);
    expect(state.cursos.find(c => c.cursoId === 1)).toBeUndefined();
  });

  it('debería manejar setSearchTermCurso', () => {
    const action = CursoActions.setSearchTermCurso({ searchTerm: 'react' });
    const state = cursoReducer(
      { ...initialCursosState, cursos: mockCursos, cursosFiltrados: mockCursos },
      action
    );

    expect(state.cursosFiltrados.length).toBe(1);
    expect(state.cursosFiltrados[0].nombre).toContain('React');
  });

  it('debería manejar setFilterByProfesor', () => {
    const action = CursoActions.setFilterByProfesor({ profesorId: 101 });
    const state = cursoReducer(
      { ...initialCursosState, cursos: mockCursos, cursosFiltrados: mockCursos },
      action
    );

    expect(state.cursosFiltrados.length).toBe(1);
    expect(state.cursosFiltrados[0].profesorId).toBe(101);
  });
});
