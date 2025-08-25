import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ user: Usuarios; token: string }> {
  return this.http.get<Usuarios[]>(`${this.apiUrl}?email=${email}`).pipe(
    map(users => {
      if (users.length === 0) {
        throw new Error('Usuario no encontrado');
      }

      const user = users[0];
      if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
      }

      const token = btoa(`${user.email}:${Date.now()}`);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    })
  );
}


  private getRoleFromEmail(email: string): string {
    if (email.includes('admin')) return 'administrador';
    if (email.includes('profe')) return 'profesor';
    return 'alumno';
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getStoredUser(): Usuarios | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}