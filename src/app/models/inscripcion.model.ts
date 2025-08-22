// src/app/models/inscripcion.model.ts
export type EstadoInscripcion = 'pendiente' | 'confirmada' | 'cancelada' | 'completada' | 'sin' | 'sin inscripcion' | 'activa' | 'finalizada';

export interface Inscripcion {
  inscrId?: number;
  cursoId: number;
  alumnoId: number;
  fechaInsc: string; 
  estado: EstadoInscripcion;
  inscriptorId: number;
}

export interface InscripcionCompleta extends Inscripcion {
  nombreCurso?: string;
  nombreAlumno?: string;
  nombreInscriptor?: string;
}