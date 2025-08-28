/* ✅ Este test cubre:
- loadCursos$ → éxito y error.
- addCurso$ → éxito.
- deleteCurso$ → éxito.
- reloadAfterSuccess$ → disparar loadCursos tras un addCursoSuccess o deleteCursoSuccess. 
*/

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CursoEffects } from './curso.effects';
import * as CursoActions from '../../store/actions/curso.actions';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { hot, cold } from 'jasmine-marbles';

describe('CursoEffects', () => {
    let actions$: Observable<any>;
    let effects: CursoEffects;
    let cursoService: jasmine.SpyObj<CursoService>;

    const dummyCursos: Curso[] = [
        {
            id: 1,
            cursoId: 1,
            nombre: 'Curso A',
            profesorId: 10,
            descripcion: 'Descripcion A',
            cantHoras: '10',
            cantClases: '5',
            comienzo: '2025-09-01',
            fin: '2025-12-01'
        },
        {
            id: 2,
            cursoId: 2,
            nombre: 'Curso B',
            profesorId: 20,
            descripcion: 'Descripcion B',
            cantHoras: '12',
            cantClases: '6',
            comienzo: '2025-09-01',
            fin: '2025-12-01'
        }
    ];

    beforeEach(() => {
        const serviceSpy = jasmine.createSpyObj('CursoService', ['getCursos', 'getCursosPorProfesor', 'agregarCurso', 'eliminarCurso']);

        TestBed.configureTestingModule({
            providers: [
                CursoEffects,
                provideMockActions(() => actions$),
                { provide: CursoService, useValue: serviceSpy }
            ]
        });

        effects = TestBed.inject(CursoEffects);
        cursoService = TestBed.inject(CursoService) as jasmine.SpyObj<CursoService>;
    });

    it('loadCursos$ should return loadCursosSuccess on success', () => {
        actions$ = hot('-a', { a: CursoActions.loadCursos() });
        cursoService.getCursos.and.returnValue(cold('-b|', { b: dummyCursos }));

        const expected = cold('--c', { 
            c: CursoActions.loadCursosSuccess({ cursos: dummyCursos.map(c => ({ ...c, cursoId: c.id, profesorId: Number(c.profesorId) })) }) 
        });

        expect(effects.loadCursos$).toBeObservable(expected);
    });

    it('loadCursos$ should return loadCursosFailure on error', () => {
        const error = new Error('Error API');
        actions$ = hot('-a', { a: CursoActions.loadCursos() });
        cursoService.getCursos.and.returnValue(cold('-#|', {}, error));

        const expected = cold('--c', { c: CursoActions.loadCursosFailure({ error: error.message }) });

        expect(effects.loadCursos$).toBeObservable(expected);
    });

    it('addCurso$ should return addCursoSuccess on success', () => {
        const newCurso: Curso = {
            id: 3,
            cursoId: 3,
            nombre: 'Curso C',
            profesorId: 30,
            descripcion: 'Descripcion C',
            cantHoras: '8',
            cantClases: '4',
            comienzo: '2025-10-01',
            fin: '2025-12-15'
        };

        actions$ = hot('-a', { a: CursoActions.addCurso({ curso: newCurso }) });
        cursoService.agregarCurso.and.returnValue(cold('-b|', { b: newCurso }));

        const expected = cold('--c', { 
            c: CursoActions.addCursoSuccess({ curso: { ...newCurso, cursoId: newCurso.id } }) 
        });

        expect(effects.addCurso$).toBeObservable(expected);
    });

    it('deleteCurso$ should return deleteCursoSuccess on success', () => {
        actions$ = hot('-a', { a: CursoActions.deleteCurso({ id: 1 }) });
        cursoService.eliminarCurso.and.returnValue(cold('-b|', { b: null }));

        const expected = cold('--c', { c: CursoActions.deleteCursoSuccess({ id: 1 }) });

        expect(effects.deleteCurso$).toBeObservable(expected);
    });

    it('reloadAfterSuccess$ should dispatch loadCursos after addCursoSuccess', () => {
        actions$ = hot('-a', { a: CursoActions.addCursoSuccess({ curso: dummyCursos[0] }) });
        const expected = cold('-b', { b: CursoActions.loadCursos() });

        expect(effects.reloadAfterSuccess$).toBeObservable(expected);
    });

    it('reloadAfterSuccess$ should dispatch loadCursos after deleteCursoSuccess', () => {
        actions$ = hot('-a', { a: CursoActions.deleteCursoSuccess({ id: dummyCursos[0].id! }) });
        const expected = cold('-b', { b: CursoActions.loadCursos() });

        expect(effects.reloadAfterSuccess$).toBeObservable(expected);
    });
});