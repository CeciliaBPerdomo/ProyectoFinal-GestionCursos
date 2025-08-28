// src/app/store/selectors/curso.selectors.spec.ts
import * as CursoSelectors from './curso.selectors';
import { CursosState } from '../models/app-state';

describe('Curso Selectors', () => {
  const mockCursos = [
    { cursoId: 1, nombre: 'Angular Básico', descripcion: 'Intro Angular', profesorId: 101, cantHoras: "40", cantClases: "10", comienzo: '2025-09-01', fin: '2025-12-01' },
    { cursoId: 2, nombre: 'TypeScript Avanzado', descripcion: 'Deep TS', profesorId: 102, cantHoras: "30", cantClases: "8", comienzo: '2025-10-01', fin: '2025-11-30' },
    { cursoId: 3, nombre: 'React Avanzado', descripcion: 'React avanzado', profesorId: 101, cantHoras: "25", cantClases: "6", comienzo: '2025-09-15', fin: '2025-12-15' },
  ];

  const initialState: CursosState = {
    cursos: mockCursos,
    cursosFiltrados: mockCursos,
    currentCurso: null,
    error: null,
    loading: false,
    filterProfesor: 'todos',
    searchTerm: ''
  };

  it('selectAllCursos debe retornar todos los cursos', () => {
    const result = CursoSelectors.selectAllCursos.projector(initialState);
    expect(result).toEqual(mockCursos);
  });

  it('selectCursosFiltrados debe retornar los cursos filtrados', () => {
    const result = CursoSelectors.selectCursosFiltrados.projector(initialState);
    expect(result).toEqual(mockCursos);
  });

  it('selectCursoLoading debe retornar el estado de loading', () => {
    const result = CursoSelectors.selectCursoLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('selectCursoError debe retornar el error', () => {
    const result = CursoSelectors.selectCursoError.projector(initialState);
    expect(result).toBeNull();
  });

  it('selectFilterProfesor debe retornar el filtro de profesor', () => {
    const result = CursoSelectors.selectFilterProfesor.projector(initialState);
    expect(result).toBe('todos');
  });

  it('selectSearchTermCurso debe retornar el término de búsqueda', () => {
    const result = CursoSelectors.selectSearchTermCurso.projector(initialState);
    expect(result).toBe('');
  });

  it('selectCursosStats debe retornar el total de cursos', () => {
    const result = CursoSelectors.selectCursosStats.projector(mockCursos);
    expect(result).toEqual({ total: 3 });
  });

  it('selectCursosStatsPorProfesor debe retornar total de cursos por profesor', () => {
    const selector = CursoSelectors.selectCursosStatsPorProfesor(101);
    const result = selector.projector(mockCursos);
    expect(result).toEqual({ total: 2 });

    const selector2 = CursoSelectors.selectCursosStatsPorProfesor(102);
    const result2 = selector2.projector(mockCursos);
    expect(result2).toEqual({ total: 1 });
  });
});
