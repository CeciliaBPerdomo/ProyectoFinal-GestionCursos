// src/app/services/curso.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos'
  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCursoPorId(id: number): Observable<Curso | undefined> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al traer curso', err);
        return of(undefined);
      })
    );
  }


  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  actualizarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.id}`, curso);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
