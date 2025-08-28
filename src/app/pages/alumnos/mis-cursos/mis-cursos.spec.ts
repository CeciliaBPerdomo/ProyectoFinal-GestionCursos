import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisCursos } from './mis-cursos';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CursoService } from '../../../services/curso.service';
import { InscripcionService } from '../../../services/inscripcion.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MisCursos', () => {
  let component: MisCursos;
  let fixture: ComponentFixture<MisCursos>;
  let store: MockStore;

  const mockCursoService = {
    getCursos: () => of([]),
    getCursoPorId: (id: number) => of({ id, nombre: 'Curso Mock', profesorId: 1 }),
    agregarCurso: (curso: any) => of(curso),
    eliminarCurso: (id: number) => of(undefined)
  };

  const mockInscripcionService = {
    getInscripciones: () => of([]),
    agregarInscripcion: (inscripcion: any) => of(inscripcion),
    eliminarInscripcion: (id: number) => of(undefined)
  };

  const mockUsuarioService = {
    getUsuarios: () => of([]),
    getUsuarioPorId: (id: number) => of({ id, nombre: 'Usuario Mock' }),
    agregarUsuario: (usuario: any) => of(usuario),
    eliminarUsuario: (id: number) => of(undefined)
  };

  const mockActivatedRoute = {
    params: of({ id: 1 }),
    snapshot: {
      paramMap: {
        get: (key: string) => '1'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCursos],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: CursoService, useValue: mockCursoService },
        { provide: InscripcionService, useValue: mockInscripcionService },
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // 🔹 inyectamos el mock
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MisCursos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
