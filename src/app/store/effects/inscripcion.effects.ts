// store / effects / inscripcion.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import * as InscripcionActions from '../actions/inscripcion.actions';
import { InscripcionService } from '../../services/inscripcion.service';

@Injectable()
export class InscripcionEffects {
  private actions$ = inject(Actions);
  private inscripcionService = inject(InscripcionService);

  loadInscripciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionActions.loadInscripciones),
      exhaustMap(() =>
        this.inscripcionService.getInscripciones().pipe(
          map((inscripciones) => InscripcionActions.loadInscripcionesSuccess({ inscripciones })),
          catchError((error) => of(InscripcionActions.loadInscripcionesFailure({ error: error.message })))
        )
      )
    )
  );

  loadInscripcionesByEstado$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionActions.loadInscripcionesByEstado),
      exhaustMap((action) =>
        this.inscripcionService.getInscripcionesPorEstado(action.estado).pipe(
          map((inscripciones) => InscripcionActions.loadInscripcionesByEstadoSuccess({ inscripciones, estado: action.estado })),
          catchError((error) => of(InscripcionActions.loadInscripcionesByEstadoFailure({ error: error.message, estado: action.estado })))
        )
      )
    )
  );

  addInscripcion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionActions.addInscripcion),
      exhaustMap((action) =>
        this.inscripcionService.agregarInscripcion(action.inscripcion).pipe(
          map((inscripcion) => InscripcionActions.addInscripcionSuccess({ inscripcion })),
          catchError((error) => of(InscripcionActions.addInscripcionFailure({ error: error.message })))
        )
      )
    )
  );

  deleteInscripcion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscripcionActions.deleteInscripcion),
      exhaustMap((action) =>
        this.inscripcionService.eliminarInscripcion(action.id).pipe(
          map(() => InscripcionActions.deleteInscripcionSuccess({ id: action.id })),
          catchError((error) => of(InscripcionActions.deleteInscripcionFailure({ error: error.message })))
        )
      )
    )
  );

  // Recargar inscripciones después de operaciones exitosas
  reloadAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InscripcionActions.addInscripcionSuccess,
        InscripcionActions.deleteInscripcionSuccess
      ),
      map(() => InscripcionActions.loadInscripciones())
    )
  );
}