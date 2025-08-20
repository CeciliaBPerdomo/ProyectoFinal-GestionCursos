// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios';

  constructor(private http: HttpClient) {}

  // Devuelve todos los usuarios
  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl).pipe(
      map(res => res || []),
      catchError(err => {
        console.error('Error al traer usuarios', err);
        return of([]);
      })
    );
  }

  // Devuelve usuarios filtrados por rol
  getUsuariosPorRol(rol: 'alumno' | 'profesor' | 'administrador'): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.apiUrl}?rol=${rol}`).pipe(
      map(res => res || []),
      catchError(err => {
        console.error(`Error al traer usuarios con rol ${rol}`, err);
        return of([]);
      })
    );
  }

  // Devuelve un usuario por ID
  getUsuarioPorId(id: number): Observable<Usuarios | undefined> {
    return this.http.get<Usuarios>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al traer usuario', err);
        return of(undefined);
      })
    );
  }

  // Agrega un nuevo usuario
  agregarUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, usuario).pipe(
      catchError(err => {
        console.error('Error al agregar usuario', err);
        return of(usuario);
      })
    );
  }

  // Modifica un usuario existente
  actualizarUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${this.apiUrl}/${usuario.usuarioId}`, usuario).pipe(
      catchError(err => {
        console.error('Error al actualizar usuario', err);
        return of(usuario);
      })
    );
  }

  // Elimina un usuario por ID
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al eliminar usuario', err);
        return of(undefined);
      })
    );
  }
}
