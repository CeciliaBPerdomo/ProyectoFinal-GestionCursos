/* ✅ Test para UsuarioEffects 
- Cada acción cubre éxito y error donde aplica.
- Todos los objetos Usuarios incluyen las propiedades obligatorias.
- Se testea reloadAfterSuccess$ para add, update y delete.
- Usa jasmine-marbles para simular los streams de Actions.
*/

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { UsuarioEffects } from './usuario.effects';
import * as UsuarioActions from '../../store/actions/usuario.actions';
import { Usuarios } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

describe('UsuarioEffects', () => {
    let actions$: Observable<any>;
    let effects: UsuarioEffects;
    let usuarioService: jasmine.SpyObj<UsuarioService>;

    const dummyUsuarios: Usuarios[] = [
        {
            usuarioId: 1,
            id: 1,
            email: 'admin@example.com',
            password: '1234',
            nombre: 'Admin Uno',
            direccion: 'Calle 1',
            telefono: '123456',
            perfil: 'Administrador',
            rol: 'administrador',
            inscripciones: [{ cursoId: 101, estado: 'aprobado' }]
        },
        {
            usuarioId: 2,
            id: 2,
            email: 'profe@example.com',
            password: '1234',
            nombre: 'Profe Dos',
            direccion: 'Calle 2',
            telefono: '654321',
            perfil: 'Profesor',
            rol: 'profesor',
            inscripciones: []
        }
    ];

    beforeEach(() => {
        const serviceSpy = jasmine.createSpyObj('UsuarioService', [
            'getUsuarios',
            'getUsuarioPorId',
            'getUsuariosPorRol',
            'agregarUsuario',
            'actualizarUsuario',
            'eliminarUsuario'
        ]);

        TestBed.configureTestingModule({
            providers: [
                UsuarioEffects,
                provideMockActions(() => actions$),
                { provide: UsuarioService, useValue: serviceSpy }
            ]
        });

        effects = TestBed.inject(UsuarioEffects);
        usuarioService = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;
    });

    it('loadUsuarios$ should return loadUsuariosSuccess on success', () => {
        actions$ = hot('-a', { a: UsuarioActions.loadUsuarios() });
        usuarioService.getUsuarios.and.returnValue(cold('-b|', { b: dummyUsuarios }));

        const expected = cold('--c', { c: UsuarioActions.loadUsuariosSuccess({ usuarios: dummyUsuarios }) });

        expect(effects.loadUsuarios$).toBeObservable(expected);
    });

    it('loadUsuarios$ should return loadUsuariosFailure on error', () => {
        const error = new Error('API Error');
        actions$ = hot('-a', { a: UsuarioActions.loadUsuarios() });
        usuarioService.getUsuarios.and.returnValue(cold('-#|', {}, error));

        const expected = cold('--c', { c: UsuarioActions.loadUsuariosFailure({ error: error.message }) });

        expect(effects.loadUsuarios$).toBeObservable(expected);
    });

    it('loadUsuario$ should return loadUsuarioSuccess when user exists', () => {
        const usuario = dummyUsuarios[0];
        actions$ = hot('-a', { a: UsuarioActions.loadUsuario({ id: usuario.id! }) });
        usuarioService.getUsuarioPorId.and.returnValue(cold('-b|', { b: usuario }));

        const expected = cold('--c', { c: UsuarioActions.loadUsuarioSuccess({ usuario }) });

        expect(effects.loadUsuario$).toBeObservable(expected);
    });

    it('loadUsuario$ should return loadUsuarioFailure when user not found', () => {
        actions$ = hot('-a', { a: UsuarioActions.loadUsuario({ id: 999 }) });
        usuarioService.getUsuarioPorId.and.returnValue(cold('-b|', { b: null }));

        const expected = cold('--c', { c: UsuarioActions.loadUsuarioFailure({ error: 'Usuario no encontrado' }) });

        expect(effects.loadUsuario$).toBeObservable(expected);
    });

    it('addUsuario$ should return addUsuarioSuccess on success', () => {
        const newUsuario: Usuarios = {
            email: 'nuevo@example.com',
            password: '1234',
            nombre: 'Nuevo Usuario',
            direccion: 'Calle 3',
            telefono: '789012',
            perfil: 'Alumno',
            rol: 'alumno'
        };
        actions$ = hot('-a', { a: UsuarioActions.addUsuario({ usuario: newUsuario }) });
        usuarioService.agregarUsuario.and.returnValue(cold('-b|', { b: newUsuario }));

        const expected = cold('--c', { c: UsuarioActions.addUsuarioSuccess({ usuario: newUsuario }) });

        expect(effects.addUsuario$).toBeObservable(expected);
    });

    it('deleteUsuario$ should return deleteUsuarioSuccess on success', () => {
        actions$ = hot('-a', { a: UsuarioActions.deleteUsuario({ id: 1 }) });
        usuarioService.eliminarUsuario.and.returnValue(cold('-b|', { b: null }));

        const expected = cold('--c', { c: UsuarioActions.deleteUsuarioSuccess({ id: 1 }) });

        expect(effects.deleteUsuario$).toBeObservable(expected);
    });

    it('reloadAfterSuccess$ should dispatch loadUsuarios after add/update/delete success', () => {
        actions$ = hot('-a-b-c', { 
            a: UsuarioActions.addUsuarioSuccess({ usuario: dummyUsuarios[0] }),
            b: UsuarioActions.updateUsuarioSuccess({ usuario: dummyUsuarios[1] }),
            c: UsuarioActions.deleteUsuarioSuccess({ id: 1 })
        });
        const expected = cold('-x-y-z', { 
            x: UsuarioActions.loadUsuarios(),
            y: UsuarioActions.loadUsuarios(),
            z: UsuarioActions.loadUsuarios()
        });

        expect(effects.reloadAfterSuccess$).toBeObservable(expected);
    });
});
