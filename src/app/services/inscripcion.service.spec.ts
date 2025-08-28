import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { InscripcionService } from './inscripcion.service';
import { Inscripcion } from '../models/inscripcion.model';

describe('InscripcionService', () => {
    let service: InscripcionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InscripcionService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(InscripcionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crearse el servicio', () => {
        expect(service).toBeTruthy();
    });

    const dummyInscripciones: Inscripcion[] = [
        {
            inscrId: 1,
            cursoId: 101,
            alumnoId: 201,
            fechaInsc: '2025-08-28',
            estado: 'pendiente',
            inscriptorId: 301
        },
        {
            inscrId: 2,
            cursoId: 102,
            alumnoId: 202,
            fechaInsc: '2025-08-29',
            estado: 'confirmada',
            inscriptorId: 302
        }
    ];

    it('getInscripciones debería devolver un array de inscripciones', () => {
        service.getInscripciones().subscribe(inscripciones => {
            expect(inscripciones.length).toBe(2);
            expect(inscripciones[0].cursoId).toBe(101);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones');
        expect(req.request.method).toBe('GET');
        req.flush(dummyInscripciones);
    });

    it('getInscripcionPorId debería devolver una inscripción específica', () => {
        service.getInscripcionPorId(1).subscribe(insc => {
            expect(insc).toBeTruthy();
            expect(insc?.inscrId).toBe(1);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones/1');
        expect(req.request.method).toBe('GET');
        req.flush(dummyInscripciones[0]);
    });

    it('getInscripcionesPorEstado debería filtrar por estado', () => {
        service.getInscripcionesPorEstado('pendiente').subscribe(insc => {
            expect(insc.length).toBe(1);
            expect(insc[0].estado).toBe('pendiente');
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones?estado=pendiente');
        expect(req.request.method).toBe('GET');
        req.flush([dummyInscripciones[0]]);
    });

    it('getInscripcionesPorAlumno debería filtrar por alumnoId', () => {
        service.getInscripcionesPorAlumno(201).subscribe(insc => {
            expect(insc.length).toBe(1);
            expect(insc[0].alumnoId).toBe(201);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones?alumnoId=201');
        expect(req.request.method).toBe('GET');
        req.flush([dummyInscripciones[0]]);
    });

    it('getInscripcionesPorCurso debería filtrar por cursoId', () => {
        service.getInscripcionesPorCurso(102).subscribe(insc => {
            expect(insc.length).toBe(1);
            expect(insc[0].cursoId).toBe(102);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones?cursoId=102');
        expect(req.request.method).toBe('GET');
        req.flush([dummyInscripciones[1]]);
    });

    it('agregarInscripcion debería devolver la inscripción agregada', () => {
        const nueva: Inscripcion = {
            inscrId: 3,
            cursoId: 103,
            alumnoId: 203,
            fechaInsc: '2025-08-30',
            estado: 'pendiente',
            inscriptorId: 303
        };

        service.agregarInscripcion(nueva).subscribe(insc => {
            expect(insc.cursoId).toBe(103);
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones');
        expect(req.request.method).toBe('POST');
        req.flush(nueva);
    });

    it('actualizarInscripcion debería devolver la inscripción actualizada', () => {
        const updated: Inscripcion = { ...dummyInscripciones[0], estado: 'confirmada' };

        service.actualizarInscripcion(updated).subscribe(insc => {
            expect(insc.estado).toBe('confirmada');
        });

        const req = httpMock.expectOne(`https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones/${updated.inscrId}`);
        expect(req.request.method).toBe('PUT');
        req.flush(updated);
    });

    it('eliminarInscripcion debería enviar DELETE', () => {
        service.eliminarInscripcion(1).subscribe(res => {
            expect(res).toBeNull();
        });

        const req = httpMock.expectOne('https://68a35265c5a31eb7bb1fe392.mockapi.io/api/inscripciones/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
});
