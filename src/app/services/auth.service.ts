import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Usuarios } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/auth'; // URL de tu API real

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ user: Usuarios; token: string }> {
    // En producción, harías una llamada HTTP real
    // return this.http.post<{ user: Usuarios; token: string }>(`${this.apiUrl}/login`, { email, password });
    
    // Mock para demo
    return of({
      user: {
        usuarioId: 1,
        email: email,
        password: password,
        nombre: 'Usuario Demo',
        direccion: 'Demo Address',
        telefono: '123456789',
        perfil: 'Demo Profile',
        rol: this.getRoleFromEmail(email)
      },
      token: 'demo-token-' + Date.now()
    });
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