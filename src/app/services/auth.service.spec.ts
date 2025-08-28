
/* 💡 Qué cubre este test:
- Creación del servicio.
- Login exitoso (almacenamiento en localStorage).
- Login con usuario inexistente.
- Login con contraseña incorrecta.
- Logout (limpieza de localStorage).
- Recuperar usuario y token del localStorage.
*/ 

import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Usuarios } from '../models/usuario.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear(); 
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  const dummyUser: Usuarios = {
    usuarioId: 1,
    nombre: 'Juan Perez',
    email: 'juan@example.com',
    password: '123456',
    direccion: 'Calle Falsa 123',
    telefono: '12345678',
    perfil: 'usuario',
    rol: 'alumno',
    inscripciones: []
  };

  it('login correcto debería devolver user y token', () => {
    service.login(dummyUser.email, '123456').subscribe(res => {
      expect(res.user.email).toBe(dummyUser.email);
      expect(res.token).toBeTruthy();
      expect(localStorage.getItem('auth_token')).toBeTruthy();
      expect(localStorage.getItem('user')).toBe(JSON.stringify(dummyUser));
    });

    const req = httpMock.expectOne(`https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios?email=${dummyUser.email}`);
    expect(req.request.method).toBe('GET');
    req.flush([dummyUser]);
  });

  it('login con usuario inexistente debería fallar', () => {
    service.login('noexiste@example.com', '123456').subscribe({
      next: () => fail('Debería fallar'),
      error: (err) => expect(err.message).toBe('Usuario no encontrado')
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios?email=noexiste@example.com');
    req.flush([]); 
  });

  it('login con contraseña incorrecta debería fallar', () => {
    service.login(dummyUser.email, 'wrongpass').subscribe({
      next: () => fail('Debería fallar'),
      error: (err) => expect(err.message).toBe('Contraseña incorrecta')
    });

    const req = httpMock.expectOne(`https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios?email=${dummyUser.email}`);
    req.flush([dummyUser]);
  });

  it('logout debería limpiar localStorage', () => {
    localStorage.setItem('auth_token', 'token');
    localStorage.setItem('user', JSON.stringify(dummyUser));

    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('getStoredUser debería retornar el usuario guardado', () => {
    localStorage.setItem('user', JSON.stringify(dummyUser));
    const user = service.getStoredUser();
    expect(user?.email).toBe(dummyUser.email);
  });

  it('getStoredToken debería retornar el token guardado', () => {
    localStorage.setItem('auth_token', 'token123');
    const token = service.getStoredToken();
    expect(token).toBe('token123');
  });
});
