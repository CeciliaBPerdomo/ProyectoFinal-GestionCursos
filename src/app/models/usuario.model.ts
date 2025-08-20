// src/app/models/usuario.model.ts

export interface Usuarios {
    usuarioId?: number;
    email: string;
    password: string;
    nombre: string;
    direccion: string;
    telefono: string;
    perfil: string;
    rol: string;
}