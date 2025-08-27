import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import * as CursoActions from '../actions/curso.actions';
import { CursoService } from '../../services/curso.service';

@Injectable()
export class CursoEffects {
  private actions$ = inject(Actions);
  private cursoService = inject(CursoService);

  loadCursos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursoActions.loadCursos),
      exhaustMap(() =>
        this.cursoService.getCursos().pipe(
          map((cursos) =>
            CursoActions.loadCursosSuccess({
              cursos: cursos.map((curso: any) => ({
                ...curso,
                cursoId: curso.cursoId ?? curso.CursoId ?? curso.id,
                profesorId: Number(curso.profesorId ?? curso.profesorID)
              }))
            })
          ),
          catchError((error) =>
            of(CursoActions.loadCursosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCursosByProfesor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursoActions.loadCursosByProfesor),
      exhaustMap((action) =>
        this.cursoService.getCursosPorProfesor(action.profesorId).pipe(
          map((cursosDelProfesor) => {
            return CursoActions.loadCursosByProfesorSuccess({
              cursos: cursosDelProfesor,
              profesorId: action.profesorId
            });
          }),
          catchError((error) =>
            of(CursoActions.loadCursosByProfesorFailure({
              error: error.message,
              profesorId: action.profesorId
            }))
          )
        )
      )
    )
  );

  addCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursoActions.addCurso),
      exhaustMap((action) =>
        this.cursoService.agregarCurso(action.curso).pipe(
          map((curso) =>
            CursoActions.addCursoSuccess({
              curso: {
                ...curso,
                cursoId: Number(curso.cursoId ?? curso.id)
              }
            })
          ),
          catchError((error) =>
            of(CursoActions.addCursoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCurso$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursoActions.deleteCurso),
      exhaustMap((action) =>
        this.cursoService.eliminarCurso(action.id).pipe(
          map(() => CursoActions.deleteCursoSuccess({ id: action.id })),
          catchError((error) =>
            of(CursoActions.deleteCursoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  reloadAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CursoActions.addCursoSuccess, CursoActions.deleteCursoSuccess),
      map(() => CursoActions.loadCursos())
    )
  );
}