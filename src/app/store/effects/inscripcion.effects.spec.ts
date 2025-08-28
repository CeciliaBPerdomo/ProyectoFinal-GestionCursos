/*
Se testea:
- loadInscripciones$ (éxito y error)
- addInscripcion$ (éxito)
- deleteInscripcion$ (éxito)
- reloadAfterSuccess$
- loadInscripcionesByAlumno$ (éxito)
- Usamos jasmine-marbles para flujos de efectos observables.
*/


import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { InscripcionEffects } from './inscripcion.effects';
import * as InscripcionActions from '../../store/actions/inscripcion.actions';
import { Inscripcion } from '../../models/inscripcion.model';
import { InscripcionService } from '../../services/inscripcion.service';
import { hot, cold } from 'jasmine-marbles';

describe('InscripcionEffects', () => {
    let actions$: Observable<any>;
    let effects: InscripcionEffects;
    let inscripcionService: jasmine.SpyObj<InscripcionService>;

    const dummyInscripciones: Inscripcion[] = [
        { inscrId: 1, cursoId: 101, alumnoId: 201, fechaInsc: '2025-08-01', estado: 'pendiente', inscriptorId: 301 },
        { inscrId: 2, cursoId: 102, alumnoId: 202, fechaInsc: '2025-08-02', estado: 'confirmada', inscriptorId: 302 }
    ];

    beforeEach(() => {
        const serviceSpy = jasmine.createSpyObj('InscripcionService', [
            'getInscripciones',
            'getInscripcionesPorEstado',
            'getInscripcionesPorAlumno',
            'agregarInscripcion',
            'eliminarInscripcion'
        ]);

        TestBed.configureTestingModule({
            providers: [
                InscripcionEffects,
                provideMockActions(() => actions$),
                { provide: InscripcionService, useValue: serviceSpy }
            ]
        });

        effects = TestBed.inject(InscripcionEffects);
        inscripcionService = TestBed.inject(InscripcionService) as jasmine.SpyObj<InscripcionService>;
    });

    it('loadInscripciones$ should return loadInscripcionesSuccess on success', () => {
        actions$ = hot('-a', { a: InscripcionActions.loadInscripciones() });
        inscripcionService.getInscripciones.and.returnValue(cold('-b|', { b: dummyInscripciones }));

        const expected = cold('--c', { c: InscripcionActions.loadInscripcionesSuccess({ inscripciones: dummyInscripciones }) });

        expect(effects.loadInscripciones$).toBeObservable(expected);
    });

    it('loadInscripciones$ should return loadInscripcionesFailure on error', () => {
        const error = new Error('API Error');
        actions$ = hot('-a', { a: InscripcionActions.loadInscripciones() });
        inscripcionService.getInscripciones.and.returnValue(cold('-#|', {}, error));

        const expected = cold('--c', { c: InscripcionActions.loadInscripcionesFailure({ error: error.message }) });

        expect(effects.loadInscripciones$).toBeObservable(expected);
    });

    it('addInscripcion$ should return addInscripcionSuccess on success', () => {
        const newInscripcion: Inscripcion = { inscrId: 3, cursoId: 103, alumnoId: 203, fechaInsc: '2025-08-03', estado: 'pendiente', inscriptorId: 303 };
        actions$ = hot('-a', { a: InscripcionActions.addInscripcion({ inscripcion: newInscripcion }) });
        inscripcionService.agregarInscripcion.and.returnValue(cold('-b|', { b: newInscripcion }));

        const expected = cold('--c', { c: InscripcionActions.addInscripcionSuccess({ inscripcion: newInscripcion }) });

        expect(effects.addInscripcion$).toBeObservable(expected);
    });

    it('deleteInscripcion$ should return deleteInscripcionSuccess on success', () => {
        actions$ = hot('-a', { a: InscripcionActions.deleteInscripcion({ id: 1 }) });
        inscripcionService.eliminarInscripcion.and.returnValue(cold('-b|', { b: null }));

        const expected = cold('--c', { c: InscripcionActions.deleteInscripcionSuccess({ id: 1 }) });

        expect(effects.deleteInscripcion$).toBeObservable(expected);
    });

    it('reloadAfterSuccess$ should dispatch loadInscripciones after addInscripcionSuccess', () => {
        actions$ = hot('-a', { a: InscripcionActions.addInscripcionSuccess({ inscripcion: dummyInscripciones[0] }) });
        const expected = cold('-b', { b: InscripcionActions.loadInscripciones() });

        expect(effects.reloadAfterSuccess$).toBeObservable(expected);
    });

    it('loadInscripcionesByAlumno$ should return loadInscripcionesByAlumnoSuccess on success', () => {
        const alumnoId = 201;
        actions$ = hot('-a', { a: InscripcionActions.loadInscripcionesByAlumno({ alumnoId }) });
        inscripcionService.getInscripcionesPorAlumno.and.returnValue(cold('-b|', { b: dummyInscripciones }));

        const expected = cold('--c', { c: InscripcionActions.loadInscripcionesByAlumnoSuccess({ inscripciones: dummyInscripciones, alumnoId }) });

        expect(effects.loadInscripcionesByAlumno$).toBeObservable(expected);
    });
});
