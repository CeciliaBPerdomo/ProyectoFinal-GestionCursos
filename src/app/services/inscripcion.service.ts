// src/app/services/inscripcion.service.ts

import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion.model';
import { AlumnoService } from './alumno.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  // private inscripciones: Inscripcion[] = [
  //   {
  //     id: 1,
  //     alumnoId: 1,
  //     cursoId: 1,
  //     fechaInscripcion: new Date('2025-07-20'),
  //     estado: 'activa'
  //   },
  //   {
  //     id: 2,
  //     alumnoId: 2,
  //     cursoId: 2,
  //     fechaInscripcion: new Date('2025-07-22'),
  //     estado: 'activa'
  //   },
  //   {
  //     id: 3,
  //     alumnoId: 4,
  //     cursoId: 3,
  //     fechaInscripcion: new Date('2025-07-23'),
  //     estado: 'cancelada'
  //   },
  //   {
  //     id: 4,
  //     alumnoId: 1,
  //     cursoId: 2,
  //     fechaInscripcion: new Date('2025-07-20'),
  //     estado: 'cancelada'
  //   },
  // ];
  private inscripciones: Inscripcion[] = [];

  constructor(private alumnoService: AlumnoService) {
    this.inicializarInscripciones();
  }

  private inicializarInscripciones(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: (alumnos) => {
        this.inscripciones = alumnos.map((alumno: any, index: number) => ({
          id: index + 1,
          alumnoId: alumno.id,
          cursoId: alumno.cursoId ?? -1,
          fechaInscripcion: new Date(),
          estado: 'activa'
        }));
      },
      error: (err) => {
        console.error('Error inicializando inscripciones:', err);
      }
    });
  }


  getInscripciones(): Inscripcion[] {
    return this.inscripciones;
  }

  getInscripcionPorId(id: number): Inscripcion | undefined {
    return this.inscripciones.find(i => i.id === id);
  }

  agregarInscripcion(inscripcion: Inscripcion): void {
    this.inscripciones.push(inscripcion);
  }

  actualizarInscripcion(inscripcionActualizada: Inscripcion): void {
    const index = this.inscripciones.findIndex(i => i.id === inscripcionActualizada.id);
    if (index !== -1) {
      this.inscripciones[index] = inscripcionActualizada;
    }
  }

  eliminarInscripcion(id: number): void {
    this.inscripciones = this.inscripciones.filter(i => i.id !== id);
  }
}
