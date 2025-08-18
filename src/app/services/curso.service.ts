// src/app/services/curso.service.ts

import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private cursos: Curso[] = [
    {
      id: 1,
      nombre: 'Angular Básico',
      descripcion: 'Curso introductorio de Angular para principiantes.',
      fechaInicio: new Date('2025-08-01'),
      duracion: 40
    },
    {
      id: 2,
      nombre: 'TypeScript Avanzado',
      descripcion: 'Profundización en el uso de TypeScript con Angular.',
      fechaInicio: new Date('2025-09-10'),
      duracion: 30
    },
    {
      id: 3,
      nombre: 'Diseño UX/UI',
      descripcion: 'Curso sobre experiencia de usuario e interfaces modernas.',
      fechaInicio: new Date('2025-10-15'),
      duracion: 20
    }
  ];

getCursos(): Observable<Curso[]> {
  return of(this.cursos);
}

getCursoPorId(id: number): Observable<Curso | undefined> {
  return of(this.cursos.find(curso => curso.id === id));
}

  agregarCurso(curso: Curso): void {
    curso.id = this.generarNuevoId();
    this.cursos.push(curso);
  }

  private generarNuevoId(): number {
  const ids = this.cursos
    .map(c => c.id)
    .filter((id): id is number => id !== undefined); // filtramos undefined

  return ids.length > 0
    ? Math.max(...ids) + 1
    : 1;
}


  actualizarCurso(cursoActualizado: Curso): void {
    const index = this.cursos.findIndex(c => c.id === cursoActualizado.id);
    if (index !== -1) {
      this.cursos[index] = cursoActualizado;
    }
  }

  eliminarCurso(id: number): void {
    this.cursos = this.cursos.filter(curso => curso.id !== id);
  }
}
