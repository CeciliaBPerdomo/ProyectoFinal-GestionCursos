// src/app/services/alumno.service.ts

import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root' // hace que el servicio esté disponible globalmente
})
export class AlumnoService {
  // Datos simulados (hardcodeados)
  private alumnos: Alumno[] = [
    { id: 1, nombre: 'Cecilia Perdomo', email: 'ceci@mail.com', cursoId: 1 },
    { id: 2, nombre: 'Juan Pérez', email: 'juan@mail.com', cursoId: 2 },
    { id: 3, nombre: 'Lucía Gómez', email: 'lucia@mail.com', cursoId: 1 }
  ];

  // Devuelve todos los alumnos
  getAlumnos(): Alumno[] {
    return this.alumnos;
  }

  // Devuelve un alumno por ID
  getAlumnoPorId(id: number): Alumno | undefined {
    return this.alumnos.find(alumno => alumno.id === id);
  }

  // Agrega un nuevo alumno
  agregarAlumno(alumno: Alumno): void {
    this.alumnos.push(alumno);
  }

  // Modifica un alumno existente
  actualizarAlumno(alumnoActualizado: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumnoActualizado.id);
    if (index !== -1) {
      this.alumnos[index] = alumnoActualizado;
    }
  }

  // Elimina un alumno por ID
  eliminarAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
  }
}
