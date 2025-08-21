// src/app/models/curso.model.ts
export interface Curso {
   id?: number;           // ← Mantener temporalmente por compatibilidad
  cursoId?: number;      // ← Nuevo campo
  nombre: string;
  descripcion: string;
  cantHoras: string;
  cantClases: string;
  comienzo: string;
  fin: string;
  profesorId: number;
  duracion?: string;
}

// Interface temporal para compatibilidad
export interface CursoConEstado extends Curso {
  estado?: string;
}