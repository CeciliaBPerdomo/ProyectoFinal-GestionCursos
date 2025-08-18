// src/app/services/alumno.service.ts
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { Observable, of, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/alumnos';
  constructor(private http: HttpClient) { }

  // Devuelve todos los alumnos
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl).pipe(
      map(res => res || []),
      catchError(err => {
        console.error('Error al traer alumnos', err);
        return of([]);
      })
    );
  }

  // Devuelve un alumno por ID
  getAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al traer alumno', err);
        return of(undefined);
      })
    );
  }

  // Agrega un nuevo alumno
  agregarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno).pipe(
      catchError(err => {
        console.error('Error al agregar alumno', err);
        return of(alumno);
      })
    );
  }

  // Modifica un alumno existente
  actualizarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${alumno.id}`, alumno).pipe(
      catchError(err => {
        console.error('Error al actualizar alumno', err);
        return of(alumno);
      })
    );
  }

  // Elimina un alumno por ID
  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar alumno', err);
        return of(undefined);
      })
    );
  }
}