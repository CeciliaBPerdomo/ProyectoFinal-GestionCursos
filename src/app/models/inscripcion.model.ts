// src/app/models/inscripcion.model.ts

export interface Inscripcion {
  id: number;
  alumnoId: number;
  cursoId: number;
  fechaInscripcion: Date;
  estado: 'activa' | 'cancelada' | 'finalizada'; 
}
