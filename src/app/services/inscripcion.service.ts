import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones';

  constructor(private http: HttpClient) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl).pipe(
      map(res => res || []),
      catchError(err => {
        console.error('Error al traer inscripciones', err);
        return of([]);
      })
    );
  }

  getInscripcionPorId(id: number): Observable<Inscripcion | undefined> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al traer inscripción', err);
        return of(undefined);
      })
    );
  }

  getInscripcionesPorEstado(estado: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?estado=${estado}`).pipe(
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer inscripciones con estado ${estado}`, err);
        return of([]);
      })
    );
  }

  getInscripcionesPorAlumno(alumnoId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?alumnoId=${alumnoId}`).pipe(
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer inscripciones del alumno ${alumnoId}`, err);
        return of([]);
      })
    );
  }

  getInscripcionesPorCurso(cursoId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?cursoId=${cursoId}`).pipe(
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer inscripciones del curso ${cursoId}`, err);
        return of([]);
      })
    );
  }

  agregarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion).pipe(
      catchError(err => {
        console.error('Error al agregar inscripción', err);
        return of(inscripcion);
      })
    );
  }

  actualizarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.apiUrl}/${inscripcion.inscrId}`, inscripcion).pipe(
      catchError(err => {
        console.error('Error al actualizar inscripción', err);
        return of(inscripcion);
      })
    );
  }

  eliminarInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar inscripción', err);
        return of(undefined);
      })
    );
  }
}