import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})

export class CursoService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos';

  constructor(private http: HttpClient) { }

  private mapCursoFromApi(curso: any): Curso {
    return {
      ...curso,
      cursoId: curso.id,
      id: curso.id,
      profesorId: Number(curso.profesorId || curso.profesorID || 0)
    };
  }

  private mapCursoToApi(curso: Curso): any {
    const { cursoId, ...cursoParaApi } = curso;
    return cursoParaApi;
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(cursos => cursos.map(curso => this.mapCursoFromApi(curso))),
      map(res => res || []),
      catchError(err => {
        console.error('Error al traer cursos', err);
        return of([]);
      })
    );
  }

  getCursoPorId(id: number): Observable<Curso | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(curso => this.mapCursoFromApi(curso)),
      catchError(err => {
        console.error('Error al traer curso', err);
        return of(undefined);
      })
    );
  }

  getCursosPorProfesor(profesorId: number): Observable<Curso[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(cursos => {
        const cursosFiltrados = cursos.filter(curso => {
          const idCurso = Number(curso.profesorId || curso.profesorID || 0);
          return idCurso === profesorId;
        });

        return cursosFiltrados.map(curso => this.mapCursoFromApi(curso));
      }),
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer cursos del profesor ${profesorId}`, err);
        return of([]);
      })
    );
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    const cursoParaApi = this.mapCursoToApi(curso);
    return this.http.post<any>(this.apiUrl, cursoParaApi).pipe(
      map(response => this.mapCursoFromApi(response)),
      catchError(err => {
        console.error('Error al agregar curso', err);
        return of(curso);
      })
    );
  }

  actualizarCurso(curso: Curso): Observable<Curso> {
    const cursoParaApi = this.mapCursoToApi(curso);
    return this.http.put<any>(`${this.apiUrl}/${curso.id}`, cursoParaApi).pipe(
      map(response => this.mapCursoFromApi(response)),
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