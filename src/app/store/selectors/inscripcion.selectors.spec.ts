// store/selectors/inscripciones.selectors.spec.ts
import { 
  selectAllInscripciones,
  selectInscripcionesFiltradas,
  selectInscripcionLoading,
  selectInscripcionError,
  selectInscripcionesStats,
  selectInscripcionesStatsPorAlumno
} from './inscripcion.selectors';
import { InscripcionesState } from '../models/app-state';
import { Inscripcion } from '../../models/inscripcion.model';

describe('Inscripciones Selectors', () => {
  const mockInscripciones: Inscripcion[] = [
    { cursoId: 1, alumnoId: 1, fechaInsc: '2025-01-01', estado: 'activa', inscriptorId: 10 },
    { cursoId: 2, alumnoId: 1, fechaInsc: '2025-01-02', estado: 'finalizada', inscriptorId: 11 },
    { cursoId: 3, alumnoId: 2, fechaInsc: '2025-01-03', estado: 'cancelada', inscriptorId: 12 },
    { cursoId: 4, alumnoId: 2, fechaInsc: '2025-01-04', estado: 'activa', inscriptorId: 13 }
  ];

  const mockState: InscripcionesState = {
    inscripciones: mockInscripciones,
    inscripcionesFiltradas: mockInscripciones,
    loading: false,
    error: null,
    currentInscripcion: null,
    searchTerm: '',
    filterEstado: "",  
    filterCurso: 0,    
    filterAlumno: "todos"    
  };

  it('should select all inscripciones', () => {
    const result = selectAllInscripciones.projector(mockState);
    expect(result.length).toBe(4);
  });

  it('should select filtered inscripciones', () => {
    const result = selectInscripcionesFiltradas.projector(mockState);
    expect(result.length).toBe(4);
  });

  it('should select loading state', () => {
    const result = selectInscripcionLoading.projector(mockState);
    expect(result).toBe(false);
  });

  it('should select error state', () => {
    const result = selectInscripcionError.projector(mockState);
    expect(result).toBeNull();
  });

  it('should select global stats', () => {
    const result = selectInscripcionesStats.projector(mockInscripciones);
    expect(result.total).toBe(4);
    expect(result.activos).toBe(2);
  });

  it('should select stats by alumnoId', () => {
    const selector = selectInscripcionesStatsPorAlumno(1);
    const result = selector.projector(mockInscripciones);
    expect(result.total).toBe(2);
    expect(result.activos).toBe(1);
    expect(result.finalizados).toBe(1);
    expect(result.cancelados).toBe(0);
  });

  it('should return zeros if alumnoId not provided', () => {
    const selector = selectInscripcionesStatsPorAlumno(0);
    const result = selector.projector(mockInscripciones);
    expect(result.total).toBe(0);
    expect(result.activos).toBe(0);
    expect(result.finalizados).toBe(0);
    expect(result.cancelados).toBe(0);
  });
});
