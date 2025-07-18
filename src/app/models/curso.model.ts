// src/app/models/curso.model.ts

export interface Curso {
    id?: number;
    nombre: string;
    descripcion?: string;
    fechaInicio: Date;
    duracion: number;     // en horas
}
