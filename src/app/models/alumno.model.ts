// src/app/models/alumno.model.ts
import { EstadoInscripcion } from './inscripcion.model';

// Definición interna para las inscripciones dentro del alumno
export interface InscripcionAlumno {
    cursoId: number;
    estado: EstadoInscripcion;
    fechaInscripcion: Date;
}

export interface Alumno {
    id: number;
    nombre: string;
    email: string;
    cursoId: number | null;
    inscripciones?: InscripcionAlumno[];
}

