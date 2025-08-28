import { initialUsuariosState, initialCursosState, initialInscripcionesState } from './app-state';

describe('AppState initial values', () => {
  it('should have correct initialUsuariosState', () => {
    expect(initialUsuariosState.usuarios).toEqual([]);
    expect(initialUsuariosState.currentUsuario).toBeNull();
    expect(initialUsuariosState.loading).toBeFalse();
    expect(initialUsuariosState.filterRol).toBe('todos');
  });

  it('should have correct initialCursosState', () => {
    expect(initialCursosState.cursos).toEqual([]);
    expect(initialCursosState.currentCurso).toBeNull();
    expect(initialCursosState.loading).toBeFalse();
    expect(initialCursosState.filterProfesor).toBe('todos');
  });

  it('should have correct initialInscripcionesState', () => {
    expect(initialInscripcionesState.inscripciones).toEqual([]);
    expect(initialInscripcionesState.currentInscripcion).toBeNull();
    expect(initialInscripcionesState.loading).toBeFalse();
    expect(initialInscripcionesState.filterEstado).toBe('todos');
    expect(initialInscripcionesState.filterCurso).toBe('todos');
    expect(initialInscripcionesState.filterAlumno).toBe('todos');
  });
});
