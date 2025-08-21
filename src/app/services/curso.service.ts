import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      map(res => res || []),
      catchError(err => {
        console.error('Error al traer cursos', err);
        return of([]);
      })
    );
  }

  getCursoPorId(id: number): Observable<Curso | undefined> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al traer curso', err);
        return of(undefined);
      })
    );
  }

  getCursosPorProfesor(profesorId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}?profesorId=${profesorId}`).pipe(
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer cursos del profesor ${profesorId}`, err);
        return of([]);
      })
    );
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso).pipe(
      catchError(err => {
        console.error('Error al agregar curso', err);
        return of(curso);
      })
    );
  }

  actualizarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.cursoId}`, curso).pipe(
      catchError(err => {
        console.error('Error al actualizar curso', err);
        return of(curso);
      })
    );
  }

  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar curso', err);
        return of(undefined);
      })
    );
  }
}