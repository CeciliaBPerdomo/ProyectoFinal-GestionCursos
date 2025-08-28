import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { Usuarios } from '../models/usuario.model';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  const dummyUsuarios: Usuarios[] = [
    {
      usuarioId: 1,
      nombre: 'Juan',
      email: 'juan@example.com',
      password: '1234',
      direccion: 'Calle Falsa 123',
      telefono: '099999999',
      perfil: 'default',
      rol: 'alumno',
      inscripciones: []
    },
    {
      usuarioId: 2,
      nombre: 'Ana',
      email: 'ana@example.com',
      password: 'abcd',
      direccion: 'Avenida Siempreviva 456',
      telefono: '098888888',
      perfil: 'default',
      rol: 'profesor',
      inscripciones: []
    }
  ];

  it('getUsuarios debería devolver un array de usuarios', () => {
    service.getUsuarios().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios[0].nombre).toBe('Juan');
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('getUsuarioPorId debería devolver un usuario específico', () => {
    service.getUsuarioPorId(1).subscribe(usuario => {
      expect(usuario).toBeTruthy();
      expect(usuario?.usuarioId).toBe(1);
      expect(usuario?.inscripciones).toEqual([]);
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios[0]);
  });

  it('agregarUsuario debería devolver el usuario agregado', () => {
    const newUsuario: Usuarios = {
      usuarioId: 3,
      nombre: 'Pedro',
      email: 'pedro@example.com',
      password: 'pass',
      direccion: 'Calle 3',
      telefono: '097777777',
      perfil: 'default',
      rol: 'alumno',
      inscripciones: []
    };

    service.agregarUsuario(newUsuario).subscribe(usuario => {
      expect(usuario.nombre).toBe('Pedro');
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios');
    expect(req.request.method).toBe('POST');
    req.flush(newUsuario);
  });

  it('actualizarUsuario debería devolver el usuario actualizado', () => {
    const updatedUsuario: Usuarios = {
      usuarioId: 1,
      nombre: 'Juan Actualizado',
      email: 'juan@example.com',
      password: '1234',
      direccion: 'Calle Falsa 123',
      telefono: '099999999',
      perfil: 'default',
      rol: 'alumno',
      inscripciones: []
    };

    service.actualizarUsuario(updatedUsuario).subscribe(usuario => {
      expect(usuario.nombre).toBe('Juan Actualizado');
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUsuario);
  });

  it('eliminarUsuario debería enviar DELETE', () => {
    service.eliminarUsuario(1).subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getUsuariosPorRol debería filtrar por rol', () => {
    service.getUsuariosPorRol('profesor').subscribe(usuarios => {
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].rol).toBe('profesor');
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios?rol=profesor');
    expect(req.request.method).toBe('GET');
    req.flush([dummyUsuarios[1]]);
  });

  it('getProfesores debería devolver solo usuarios con rol profesor', () => {
    service.getProfesores().subscribe(usuarios => {
      expect(usuarios.length).toBe(1);
      expect(usuarios[0].rol).toBe('profesor');
    });

    const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/usuarios?rol=profesor');
    expect(req.request.method).toBe('GET');
    req.flush([dummyUsuarios[1]]);
  });
});
