// src/app/store/effects/usuario.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as UsuarioActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  private actions$ = inject(Actions);
  private usuarioService = inject(UsuarioService);

  // Cargar usuario por ID
  loadUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.loadUsuario),
      exhaustMap((action) =>
        this.usuarioService.getUsuarioPorId(action.id).pipe(
          map((usuario) => {
            if (usuario) {
              // Garantizamos que exista el array de inscripciones
              const usuarioConInscripciones = {
                ...usuario,
                inscripciones: usuario.inscripciones ?? []
              };
              return UsuarioActions.loadUsuarioSuccess({ usuario: usuarioConInscripciones });
            } else {
              return UsuarioActions.loadUsuarioFailure({ error: 'Usuario no encontrado' });
            }
          }),
          catchError((error) =>
            of(UsuarioActions.loadUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Cargar todos los usuarios
  loadUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.loadUsuarios),
      exhaustMap(() =>
        this.usuarioService.getUsuarios().pipe(
          map((usuarios) => UsuarioActions.loadUsuariosSuccess({ usuarios })),
          catchError((error) =>
            of(UsuarioActions.loadUsuariosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Cargar usuarios por rol
  loadUsuariosByRol$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.loadUsuariosByRol),
      exhaustMap((action) =>
        this.usuarioService.getUsuariosPorRol(action.rol as any).pipe(
          map((usuarios) =>
            UsuarioActions.loadUsuariosByRolSuccess({ usuarios, rol: action.rol })
          ),
          catchError((error) =>
            of(
              UsuarioActions.loadUsuariosByRolFailure({
                error: error.message,
                rol: action.rol
              })
            )
          )
        )
      )
    )
  );

  // Agregar usuario
  addUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.addUsuario),
      exhaustMap((action) =>
        this.usuarioService.agregarUsuario(action.usuario).pipe(
          map((usuario) => UsuarioActions.addUsuarioSuccess({ usuario })),
          catchError((error) =>
            of(UsuarioActions.addUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Actualizar usuario
  updateUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.updateUsuario),
      exhaustMap((action) =>
        this.usuarioService.actualizarUsuario(action.usuario).pipe(
          map((usuario) => UsuarioActions.updateUsuarioSuccess({ usuario })),
          catchError((error) =>
            of(UsuarioActions.updateUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Eliminar usuario
  deleteUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsuarioActions.deleteUsuario),
      exhaustMap((action) =>
        this.usuarioService.eliminarUsuario(action.id).pipe(
          map(() => UsuarioActions.deleteUsuarioSuccess({ id: action.id })),
          catchError((error) =>
            of(UsuarioActions.deleteUsuarioFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Recargar usuarios después de operaciones exitosas
  reloadAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UsuarioActions.addUsuarioSuccess,
        UsuarioActions.updateUsuarioSuccess,
        UsuarioActions.deleteUsuarioSuccess
      ),
      map(() => UsuarioActions.loadUsuarios())
    )
  );
}