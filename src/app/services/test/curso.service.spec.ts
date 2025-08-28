import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CursoService } from '../curso.service';
import { Curso } from '../../models/curso.model';

describe('CursoService', () => {
    let service: CursoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CursoService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(CursoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crearse el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('getCursos debería devolver un array de cursos', () => {
        const dummyCursos: any[] = [
            { id: 1, nombre: 'Curso A', profesorId: 10 },
            { id: 2, nombre: 'Curso B', profesorId: 20 }
        ];

        service.getCursos().subscribe(cursos => {
            expect(cursos.length).toBe(2);
            expect(cursos[0].nombre).toBe('Curso A');
            expect(cursos[0].id).toBe(1);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos');
        expect(req.request.method).toBe('GET');
        req.flush(dummyCursos);
    });

    it('getCursoPorId debería devolver un curso específico', () => {
        const dummyCurso = { id: 1, nombre: 'Curso A', profesorId: 10 };

        service.getCursoPorId(1).subscribe(curso => {
            expect(curso).toBeTruthy();
            expect(curso?.cursoId).toBe(1);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos/1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyCurso);
    });

    it('agregarCurso debería devolver el curso agregado', () => {
        const newCurso: Curso = {
            id: 3,
            cursoId: 3,
            nombre: 'Curso C',
            profesorId: 30,
            descripcion: 'Curso de prueba',
            cantHoras: '10',
            cantClases: '5',
            comienzo: '2025-09-01',
            fin: '2025-12-01'
        };

        service.agregarCurso(newCurso).subscribe(curso => {
            expect(curso.nombre).toBe('Curso C');
            expect(curso.descripcion).toBe('Curso de prueba');
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos');
        expect(req.request.method).toBe('POST');
        req.flush(newCurso);
    });

    it('eliminarCurso debería enviar DELETE', () => {
        service.eliminarCurso(1).subscribe(res => {
            expect(res).toBeNull();
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/cursos/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});