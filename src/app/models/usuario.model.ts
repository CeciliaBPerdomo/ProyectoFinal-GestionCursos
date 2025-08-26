// src/app/models/usuario.model.ts
export interface Inscripcion {
  cursoId: string | number;
  estado: string; // 'aprobado', 'pendiente', etc
}

export interface Usuarios {
    usuarioId?: number;
    id?: number; 
    email: string;
    password: string;
    nombre: string;
    direccion: string;
    telefono: string;
    perfil: string;
    rol: string;
    inscripciones?: Inscripcion[];
}